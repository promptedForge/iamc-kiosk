import { getLLMService } from './llm'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8787'

interface ReportData {
  brief: any
  hypotheses: any[]
  lensBrief?: any
  config?: any
  evidence?: any[]
}

interface GeneratedReport {
  executive_summary: string
  situational_analysis: string
  risk_assessment: string
  opportunity_analysis: string
  recommendations: string
  hypothesis_evaluation: string
  action_items: {
    immediate: string[]
    short_term: string[]
    medium_term: string[]
  }
  communication_strategy: {
    internal: string
    external: string
    media: string
  }
  appendix: {
    evidence_summary: string
    methodology_note: string
  }
}

export class ReportGenerator {
  /**
   * Fetch all data related to an issue
   */
  async fetchIssueData(issueId: string, lens: string = 'ceo'): Promise<ReportData> {
    try {
      // Fetch all data in parallel
      const [briefResponse, hypothesesResponse, lensBriefResponse, configResponse] = await Promise.all([
        fetch(`${API}/brief/${issueId}`),
        fetch(`${API}/hypotheses/${issueId}`),
        fetch(`${API}/brief/${issueId}?lens=${lens}`),
        fetch(`${API}/config`)
      ])

      const brief = await briefResponse.json()
      const hypotheses = hypothesesResponse.ok ? await hypothesesResponse.json() : []
      const lensBrief = lensBriefResponse.ok ? await lensBriefResponse.json() : null
      const config = configResponse.ok ? await configResponse.json() : null

      return {
        brief,
        hypotheses,
        lensBrief,
        config,
        evidence: brief.evidence || []
      }
    } catch (error) {
      console.error('Failed to fetch issue data:', error)
      throw error
    }
  }

  /**
   * Generate a comprehensive intelligence report
   */
  async generateReport(
    data: ReportData, 
    audience: string = 'CEO',
    model?: string
  ): Promise<GeneratedReport> {
    const llm = getLLMService()
    const selectedModel = model || 'anthropic/claude-sonnet-4-20250514-1m'

    const prompt = this.buildReportPrompt(data, audience)
    
    console.log('Generating comprehensive report with model:', selectedModel)
    
    try {
      const response = await llm.createChatCompletion({
        model: selectedModel,
        messages: [
          {
            role: 'system',
            content: `You are a senior intelligence analyst creating comprehensive reports for human rights monitoring. 
Your reports are used by ${audience} to make critical decisions about resource allocation and response strategies.
Generate detailed, actionable intelligence reports based on the provided data.
IMPORTANT: Return ONLY valid JSON matching the exact structure requested, with no markdown formatting or additional text.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 4096
      })

      console.log('Report generation response:', response)

      // Parse the response
      let content = response.choices[0].message.content.trim()
      content = content.replace(/^```json\n?/, '').replace(/\n?```$/, '')
      
      try {
        return JSON.parse(content)
      } catch (parseError) {
        console.error('Failed to parse report JSON:', parseError)
        // Return a structured fallback
        return this.generateFallbackReport(data, audience)
      }
    } catch (error) {
      console.error('Failed to generate report:', error)
      return this.generateFallbackReport(data, audience)
    }
  }

  /**
   * Build the comprehensive prompt for report generation
   */
  private buildReportPrompt(data: ReportData, audience: string): string {
    const { brief, hypotheses, lensBrief } = data
    
    return `Generate a comprehensive intelligence report based on the following data:

BRIEF INFORMATION:
Title: ${brief.title}
Summary: ${brief.summary}
Risks: ${JSON.stringify(brief.risks)}
Opportunities: ${JSON.stringify(brief.opportunities)}
Recommendations: ${JSON.stringify(brief.recommendations)}
Evidence Sources: ${JSON.stringify(brief.evidence)}
Geographic Scope: ${JSON.stringify(brief.geo)}
Topics: ${JSON.stringify(brief.topic)}

${hypotheses.length > 0 ? `
HYPOTHESES (${hypotheses.length} detected patterns):
${hypotheses.map((h, i) => `
Hypothesis ${i + 1}:
- Pattern: ${h.text}
- Confidence: ${h.confidence}
- Lead Time: ${h.lead_days} days
- Factors: ${JSON.stringify(h.factors)}
`).join('\n')}
` : 'No hypotheses available.'}

${lensBrief ? `
LENS-SPECIFIC INSIGHTS (${lensBrief.lens || 'executive'}):
Actions: ${JSON.stringify(lensBrief.actions)}
Talking Points: ${JSON.stringify(lensBrief.talking_points)}
` : ''}

TARGET AUDIENCE: ${audience}

Generate a comprehensive report with the following JSON structure:
{
  "executive_summary": "2-3 paragraph executive summary highlighting key findings and immediate actions",
  "situational_analysis": "Detailed analysis of the current situation, trends, and implications",
  "risk_assessment": "Comprehensive risk analysis with likelihood and impact assessments",
  "opportunity_analysis": "Strategic opportunities and potential positive outcomes",
  "recommendations": "Detailed recommendations with implementation strategies",
  "hypothesis_evaluation": "Analysis of detected patterns and their implications",
  "action_items": {
    "immediate": ["Actions to take within 24 hours"],
    "short_term": ["Actions for the next 7 days"],
    "medium_term": ["Actions for the next 30 days"]
  },
  "communication_strategy": {
    "internal": "Internal communication approach and key messages",
    "external": "External/public communication strategy for Facebook and social media",
    "media": "Media engagement approach and talking points"
  },
  "appendix": {
    "evidence_summary": "Summary of evidence sources and confidence levels",
    "methodology_note": "Brief note on analysis methodology and limitations"
  }
}`
  }

  /**
   * Generate a fallback report if LLM fails
   */
  private generateFallbackReport(data: ReportData, audience: string): GeneratedReport {
    const { brief, hypotheses, lensBrief } = data
    
    return {
      executive_summary: `${brief.title}\n\n${brief.summary}\n\nThis report analyzes emerging patterns that may impact human rights across ${brief.geo?.join(', ') || 'multiple regions'}. Immediate action is recommended to address identified risks while capitalizing on strategic opportunities.`,
      
      situational_analysis: `The current situation involves ${brief.topic?.join(', ') || 'multiple sectors'} with particular focus on ${brief.title.toLowerCase()}. ${brief.summary} Evidence from ${brief.evidence?.length || 0} sources indicates a developing situation requiring careful monitoring and strategic response.`,
      
      risk_assessment: brief.risks.map((risk, i) => `${i + 1}. ${risk}`).join('\n'),
      
      opportunity_analysis: brief.opportunities.map((opp, i) => `${i + 1}. ${opp}`).join('\n'),
      
      recommendations: brief.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n'),
      
      hypothesis_evaluation: hypotheses.length > 0 
        ? hypotheses.map(h => `• ${h.text} (Confidence: ${Math.round(h.confidence * 100)}%, Lead time: ${h.lead_days} days)`).join('\n')
        : 'No significant patterns detected at this time.',
      
      action_items: {
        immediate: lensBrief?.actions?.slice(0, 2) || [brief.recommendations[0]],
        short_term: lensBrief?.actions?.slice(2, 4) || [brief.recommendations[1]],
        medium_term: lensBrief?.actions?.slice(4) || [brief.recommendations[2]]
      },
      
      communication_strategy: {
        internal: `Brief ${audience} and key stakeholders on ${brief.title}. Focus on ${brief.risks[0]} and ${brief.opportunities[0]}.`,
        external: lensBrief?.talking_points?.[0] || `Monitor situation and prepare measured response regarding ${brief.topic?.[0]}.`,
        media: lensBrief?.talking_points?.[1] || 'Maintain neutral stance while gathering additional information.'
      },
      
      appendix: {
        evidence_summary: brief.evidence?.map(e => `${e.source}: ${Math.round(e.confidence * 100)}% confidence`).join(', ') || 'Evidence pending verification.',
        methodology_note: 'Analysis based on multi-source intelligence gathering with pattern recognition algorithms. Confidence levels indicate source reliability and corroboration strength.'
      }
    }
  }

  /**
   * Format report for display/export
   */
  formatReportAsMarkdown(report: GeneratedReport, metadata: any): string {
    const date = new Date().toISOString().split('T')[0]
    
    return `# Intelligence Report
**Generated:** ${date}
**Classification:** ${metadata.classification || 'Internal Use Only'}

## Executive Summary
${report.executive_summary}

## Situational Analysis
${report.situational_analysis}

## Risk Assessment
${report.risk_assessment}

## Opportunity Analysis
${report.opportunity_analysis}

## Recommendations
${report.recommendations}

## Hypothesis Evaluation
${report.hypothesis_evaluation}

## Action Items

### Immediate (24 hours)
${report.action_items.immediate.map(item => `- ${item}`).join('\n')}

### Short-term (7 days)
${report.action_items.short_term.map(item => `- ${item}`).join('\n')}

### Medium-term (30 days)
${report.action_items.medium_term.map(item => `- ${item}`).join('\n')}

## Communication Strategy

### Internal Communications
${report.communication_strategy.internal}

### External Communications
${report.communication_strategy.external}

### Media Engagement
${report.communication_strategy.media}

---

## Appendix

### Evidence Summary
${report.appendix.evidence_summary}

### Methodology Note
${report.appendix.methodology_note}
`
  }
}

// Export singleton instance
export const reportGenerator = new ReportGenerator()
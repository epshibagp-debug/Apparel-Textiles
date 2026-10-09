import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
  Packer
} from 'docx';
import { saveAs } from 'file-saver';
import {
  ProjectPlanConfig,
  Persona,
  IndustryTrend,
  WebBestPractice,
  CoreFunctionality,
  TechStackItem,
  TimelineMilestone,
  WorkBreakdownTask
} from '../types/projectPlan';

interface PlanExportData {
  config: ProjectPlanConfig;
  executiveSummary: {
    vision: string;
    strategicObjectives: string[];
    keyMetrics: { label: string; target: string; baseline: string }[];
  };
  industryTrends: IndustryTrend[];
  buyerPersonas: Persona[];
  webBestPractices: WebBestPractice[];
  coreFunctionalities: CoreFunctionality[];
  techStackItems: TechStackItem[];
  projectMilestones: TimelineMilestone[];
  workBreakdownHours: WorkBreakdownTask[];
  riskMitigations: { risk: string; severity: string; mitigation: string }[];
  evaluationCriteriaAudit: { criterion: string; weight: string; status: string; details: string }[];
}

export async function generateAndDownloadDocx(data: PlanExportData) {
  const {
    config,
    executiveSummary,
    industryTrends,
    buyerPersonas,
    webBestPractices,
    coreFunctionalities,
    techStackItems,
    projectMilestones,
    workBreakdownHours,
    riskMitigations,
    evaluationCriteriaAudit
  } = data;

  const primaryColor = '1E3A8A'; // Deep Navy
  const secondaryColor = '334155'; // Slate
  const accentColor = 'B45309'; // Warm Amber/Gold
  const tableHeaderBg = 'F1F5F9';
  const tableBorderColor = 'CBD5E1';

  const defaultBorder = {
    top: { style: BorderStyle.SINGLE, size: 1, color: tableBorderColor },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: tableBorderColor },
    left: { style: BorderStyle.SINGLE, size: 1, color: tableBorderColor },
    right: { style: BorderStyle.SINGLE, size: 1, color: tableBorderColor }
  };

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Calibri',
            size: 22, // 11pt
            color: '1F2937'
          },
          paragraph: {
            spacing: {
              line: 360, // 1.5 line spacing
              after: 120 // 6pt after
            }
          }
        }
      }
    },
    sections: [
      {
        properties: {},
        children: [
          // TITLE / COVER PAGE
          new Paragraph({
            spacing: { before: 720, after: 240 },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'STRATEGIC WEB PROJECT PLAN',
                bold: true,
                size: 44, // 22pt
                color: primaryColor
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 480 },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `${config.brandName}: Sustainable Apparel & High-Performance Textile Platform`,
                italics: true,
                size: 28, // 14pt
                color: accentColor
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 720 },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'Week 1 Deliverable: Research, Strategy, Core Scope & Implementation Roadmap',
                bold: true,
                size: 24,
                color: secondaryColor
              })
            ]
          }),

          // METADATA BOX
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: defaultBorder,
                    shading: { fill: 'F8FAFC', type: ShadingType.CLEAR },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Project Name: ', bold: true }),
                          new TextRun(config.projectTitle)
                        ]
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Author / Lead: ', bold: true }),
                          new TextRun(config.authorName)
                        ]
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Deliverable Code: ', bold: true }),
                          new TextRun(config.studentOrTeamId)
                        ]
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Date of Submission: ', bold: true }),
                          new TextRun(config.submissionDate)
                        ]
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Niche Focus: ', bold: true }),
                          new TextRun(config.nicheFocus)
                        ]
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Estimated Budget: ', bold: true }),
                          new TextRun(config.estimatedBudget)
                        ]
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Target Launch: ', bold: true }),
                          new TextRun(config.targetLaunchDate)
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 480, after: 240 }, children: [] }),

          // SECTION 1: PROJECT OVERVIEW
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({
                text: '1. Project Overview & Executive Summary',
                bold: true,
                size: 32,
                color: primaryColor
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Strategic Vision: ',
                bold: true
              }),
              new TextRun(executiveSummary.vision)
            ]
          }),
          new Paragraph({
            spacing: { before: 180, after: 120 },
            children: [
              new TextRun({
                text: 'Key Strategic Objectives:',
                bold: true,
                color: secondaryColor
              })
            ]
          }),
          ...executiveSummary.strategicObjectives.map(
            (obj) =>
              new Paragraph({
                bullet: { level: 0 },
                children: [new TextRun(obj)]
              })
          ),

          // Quantitative Targets Table
          new Paragraph({
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({
                text: 'Quantitative Success Benchmarks (KPI Targets):',
                bold: true,
                color: secondaryColor
              })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: defaultBorder,
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Performance Metric', bold: true })] })]
                  }),
                  new TableCell({
                    borders: defaultBorder,
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Target Level', bold: true })] })]
                  }),
                  new TableCell({
                    borders: defaultBorder,
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Industry Baseline', bold: true })] })]
                  })
                ]
              }),
              ...executiveSummary.keyMetrics.map(
                (m) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        borders: defaultBorder,
                        children: [new Paragraph({ children: [new TextRun(m.label)] })]
                      }),
                      new TableCell({
                        borders: defaultBorder,
                        children: [new Paragraph({ children: [new TextRun({ text: m.target, bold: true })] })]
                      }),
                      new TableCell({
                        borders: defaultBorder,
                        children: [new Paragraph({ children: [new TextRun(m.baseline)] })]
                      })
                    ]
                  })
              )
            ]
          }),

          // SECTION 2: MARKET RESEARCH & TRENDS
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 480, after: 180 },
            children: [
              new TextRun({
                text: '2. Market Research & Apparel / Textile Industry Trends',
                bold: true,
                size: 32,
                color: primaryColor
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun(
                'A rigorous survey of publicly available market research and competitor architectures (including Patagonia, Reformation, Loro Piana, and Spoonflower) reveals four decisive paradigm shifts in digital textile and apparel commerce:'
              )
            ]
          }),
          ...industryTrends.flatMap((trend) => [
            new Paragraph({
              spacing: { before: 180, after: 60 },
              children: [
                new TextRun({
                  text: `• ${trend.title} [Impact: ${trend.impact}]`,
                  bold: true,
                  color: primaryColor
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Industry Evidence: ', bold: true, italics: true }),
                new TextRun(trend.statistic)
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Market Context: ', bold: true }),
                new TextRun(trend.description)
              ]
            }),
            new Paragraph({
              spacing: { after: 180 },
              children: [
                new TextRun({ text: 'Strategic Platform Response: ', bold: true, color: accentColor }),
                new TextRun(trend.strategicImplication)
              ]
            })
          ]),

          // SECTION 3: TARGET AUDIENCE & PERSONAS
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 480, after: 180 },
            children: [
              new TextRun({
                text: '3. Target Audience & Buyer Persona Profiles',
                bold: true,
                size: 32,
                color: primaryColor
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun(
                'To capture high lifetime value, the platform executes a dual-funnel strategy addressing both direct luxury apparel consumers and commercial wholesale textile designers.'
              )
            ]
          }),
          ...buyerPersonas.flatMap((persona) => [
            new Paragraph({
              spacing: { before: 240, after: 100 },
              children: [
                new TextRun({
                  text: `Persona ${persona.segment}: ${persona.name} — ${persona.role}`,
                  bold: true,
                  size: 24,
                  color: primaryColor
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Profile: ', bold: true }),
                new TextRun(
                  `Age: ${persona.demographics.age} | Location: ${persona.demographics.location} | Tech: ${persona.demographics.techProficiency} | Budget/Income: ${persona.demographics.incomeOrBudget}`
                )
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Representative Quote: ', bold: true, italics: true }),
                new TextRun({ text: persona.quote, italics: true })
              ]
            }),
            new Paragraph({
              spacing: { before: 60, after: 40 },
              children: [new TextRun({ text: 'Core Goals & Motivations:', bold: true })]
            }),
            ...persona.goals.map(
              (g) =>
                new Paragraph({
                  bullet: { level: 0 },
                  children: [new TextRun(g)]
                })
            ),
            new Paragraph({
              spacing: { before: 60, after: 40 },
              children: [new TextRun({ text: 'Friction Points & Frustrations:', bold: true })]
            }),
            ...persona.painPoints.map(
              (p) =>
                new Paragraph({
                  bullet: { level: 0 },
                  children: [new TextRun(p)]
                })
            ),
            new Paragraph({
              spacing: { before: 60, after: 120 },
              children: [
                new TextRun({ text: 'Mandatory Platform Features: ', bold: true, color: accentColor }),
                new TextRun(persona.keyFeaturesNeeded.join(', '))
              ]
            })
          ]),

          // SECTION 4: WEB BEST PRACTICES & ACCESSIBILITY
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 480, after: 180 },
            children: [
              new TextRun({
                text: '4. Web Development Best Practices & Accessibility (WCAG 2.2 AA)',
                bold: true,
                size: 32,
                color: primaryColor
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun(
                'High-end fashion websites historically suffer from heavy image payloads, low contrast, and unsemantic markup. Our project plan establishes uncompromising standards across four technical pillars:'
              )
            ]
          }),
          ...webBestPractices.flatMap((bp) => [
            new Paragraph({
              spacing: { before: 180, after: 60 },
              children: [
                new TextRun({
                  text: `Pillar: ${bp.pillar} — ${bp.requirement}`,
                  bold: true,
                  color: primaryColor
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Specification: ', bold: true }),
                new TextRun(bp.specification)
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Implementation Detail: ', bold: true }),
                new TextRun(bp.implementationDetail)
              ]
            }),
            new Paragraph({
              spacing: { after: 120 },
              children: [
                new TextRun({ text: 'Compliance Verification: ', bold: true, color: accentColor }),
                new TextRun(bp.complianceTarget)
              ]
            })
          ]),

          // SECTION 5: PROJECT SCOPE & CORE FUNCTIONALITIES
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 480, after: 180 },
            children: [
              new TextRun({
                text: '5. Project Scope & Core Functionalities Specification',
                bold: true,
                size: 32,
                color: primaryColor
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun(
                'The scope is defined using MoSCoW prioritization, distinguishing essential cataloguing and interaction systems from subsequent iterative phases:'
              )
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: defaultBorder,
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Module', bold: true })] })]
                  }),
                  new TableCell({
                    borders: defaultBorder,
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Feature Name & Priority', bold: true })] })]
                  }),
                  new TableCell({
                    borders: defaultBorder,
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Functional Details', bold: true })] })]
                  })
                ]
              }),
              ...coreFunctionalities.map(
                (func) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        borders: defaultBorder,
                        children: [new Paragraph({ children: [new TextRun({ text: func.module, bold: true })] })]
                      }),
                      new TableCell({
                        borders: defaultBorder,
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({ text: func.featureName, bold: true }),
                              new TextRun({ text: `\n[${func.priority}]`, italics: true, color: accentColor })
                            ]
                          })
                        ]
                      }),
                      new TableCell({
                        borders: defaultBorder,
                        children: [
                          new Paragraph({ children: [new TextRun(func.description)] }),
                          new Paragraph({
                            children: [
                              new TextRun({ text: 'Tech Note: ', bold: true, italics: true }),
                              new TextRun({ text: func.technicalConsideration, italics: true })
                            ]
                          })
                        ]
                      })
                    ]
                  })
              )
            ]
          }),

          // SECTION 6: TECHNOLOGY STACK & ARCHITECTURE
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 480, after: 180 },
            children: [
              new TextRun({
                text: '6. Recommended Technology Stack & Architecture Rationale',
                bold: true,
                size: 32,
                color: primaryColor
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun(
                'A modern headless, API-first architecture was selected over traditional monolithic platforms to provide maximum speed, flexible catalog modeling, and sub-second catalog transitions.'
              )
            ]
          }),
          ...techStackItems.flatMap((item) => [
            new Paragraph({
              spacing: { before: 180, after: 40 },
              children: [
                new TextRun({
                  text: `${item.layer}: ${item.technology}`,
                  bold: true,
                  size: 22,
                  color: primaryColor
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Technical Justification: ', bold: true }),
                new TextRun(item.justification)
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Alternatives Evaluated: ', bold: true }),
                new TextRun(item.alternativesConsidered.join(', '))
              ]
            }),
            new Paragraph({
              spacing: { after: 120 },
              children: [
                new TextRun({ text: 'Tradeoffs & Mitigations: ', bold: true, color: accentColor }),
                new TextRun(item.tradeoffs)
              ]
            })
          ]),

          // SECTION 7: PROJECT TIMELINE & MILESTONES
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 480, after: 180 },
            children: [
              new TextRun({
                text: '7. Comprehensive Project Timeline, Milestones & Iteration Roadmap',
                bold: true,
                size: 32,
                color: primaryColor
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun(
                'The development lifecycle spans 16 weeks across 7 structured phases, incorporating continuous feedback loops and post-launch iteration cycles:'
              )
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: defaultBorder,
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Phase & Timeline', bold: true })] })]
                  }),
                  new TableCell({
                    borders: defaultBorder,
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Key Deliverables', bold: true })] })]
                  }),
                  new TableCell({
                    borders: defaultBorder,
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Iteration & Feedback Focus', bold: true })] })]
                  })
                ]
              }),
              ...projectMilestones.map(
                (ms) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        borders: defaultBorder,
                        children: [
                          new Paragraph({ children: [new TextRun({ text: ms.phase, bold: true })] }),
                          new Paragraph({ children: [new TextRun({ text: ms.weekRange, italics: true })] })
                        ]
                      }),
                      new TableCell({
                        borders: defaultBorder,
                        children: ms.keyDeliverables.map(
                          (deliv) =>
                            new Paragraph({
                              bullet: { level: 0 },
                              children: [new TextRun(deliv)]
                            })
                        )
                      }),
                      new TableCell({
                        borders: defaultBorder,
                        children: [new Paragraph({ children: [new TextRun(ms.iterationFocus)] })]
                      })
                    ]
                  })
              )
            ]
          }),

          // SECTION 8: 30-35 HOUR DETAILED WORK BREAKDOWN (WBS)
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 480, after: 180 },
            children: [
              new TextRun({
                text: '8. Week 1 Work Breakdown Structure (30-35 Hours Feasibility)',
                bold: true,
                size: 32,
                color: primaryColor
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun(
                'In accordance with project guidelines, the Week 1 strategic planning phase was executed over an intensive 34-hour schedule structured across five core phases:'
              )
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: defaultBorder,
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Timeline & Task', bold: true })] })]
                  }),
                  new TableCell({
                    borders: defaultBorder,
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Hours', bold: true })] })]
                  }),
                  new TableCell({
                    borders: defaultBorder,
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Activity & Concrete Deliverable', bold: true })] })]
                  })
                ]
              }),
              ...workBreakdownHours.map(
                (wbs) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        borders: defaultBorder,
                        children: [
                          new Paragraph({ children: [new TextRun({ text: wbs.taskTitle, bold: true })] }),
                          new Paragraph({ children: [new TextRun({ text: wbs.dayOrPhase, italics: true })] })
                        ]
                      }),
                      new TableCell({
                        borders: defaultBorder,
                        children: [new Paragraph({ children: [new TextRun({ text: `${wbs.hours} hrs`, bold: true })] })]
                      }),
                      new TableCell({
                        borders: defaultBorder,
                        children: [new Paragraph({ children: [new TextRun(wbs.deliverable)] })]
                      })
                    ]
                  })
              )
            ]
          }),

          // SECTION 9: RISK MANAGEMENT & MITIGATIONS
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 480, after: 180 },
            children: [
              new TextRun({
                text: '9. Risk Management Matrix & Feasibility Mitigation',
                bold: true,
                size: 32,
                color: primaryColor
              })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: defaultBorder,
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Identified Risk', bold: true })] })]
                  }),
                  new TableCell({
                    borders: defaultBorder,
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Severity', bold: true })] })]
                  }),
                  new TableCell({
                    borders: defaultBorder,
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Mitigation Strategy', bold: true })] })]
                  })
                ]
              }),
              ...riskMitigations.map(
                (r) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        borders: defaultBorder,
                        children: [new Paragraph({ children: [new TextRun(r.risk)] })]
                      }),
                      new TableCell({
                        borders: defaultBorder,
                        children: [new Paragraph({ children: [new TextRun({ text: r.severity, bold: true })] })]
                      }),
                      new TableCell({
                        borders: defaultBorder,
                        children: [new Paragraph({ children: [new TextRun(r.mitigation)] })]
                      })
                    ]
                  })
              )
            ]
          }),

          // SECTION 10: EVALUATION CRITERIA SELF-AUDIT
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 480, after: 180 },
            children: [
              new TextRun({
                text: '10. Compliance Audit Against Project Evaluation Criteria',
                bold: true,
                size: 32,
                color: primaryColor
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun(
                'This plan has been rigorously vetted against all four evaluation criteria outlined in the Week 1 project brief:'
              )
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: defaultBorder,
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Evaluation Criterion', bold: true })] })]
                  }),
                  new TableCell({
                    borders: defaultBorder,
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Weight & Status', bold: true })] })]
                  }),
                  new TableCell({
                    borders: defaultBorder,
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Compliance Justification', bold: true })] })]
                  })
                ]
              }),
              ...evaluationCriteriaAudit.map(
                (crit) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        borders: defaultBorder,
                        children: [new Paragraph({ children: [new TextRun({ text: crit.criterion, bold: true })] })]
                      }),
                      new TableCell({
                        borders: defaultBorder,
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({ text: `${crit.weight} - `, bold: true }),
                              new TextRun({ text: crit.status, color: '166534', bold: true })
                            ]
                          })
                        ]
                      }),
                      new TableCell({
                        borders: defaultBorder,
                        children: [new Paragraph({ children: [new TextRun(crit.details)] })]
                      })
                    ]
                  })
              )
            ]
          }),

          // SIGN OFF BLOCK
          new Paragraph({ spacing: { before: 480, after: 120 }, children: [] }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Document Prepared by: ', bold: true }),
              new TextRun(`${config.authorName} (${config.studentOrTeamId})`)
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Platform Initiative: ', bold: true }),
              new TextRun(`${config.brandName} - Strategy & Planning Milestone (Week 1 of 16)`)
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Status: ', bold: true }),
              new TextRun('Approved for Phase 2 Architecture & Design Systems')
            ]
          })
        ]
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const sanitizedName = config.brandName.replace(/[^a-zA-Z0-9]/g, '_');
  saveAs(blob, `Week1_Project_Planning_and_Strategy_${sanitizedName}.docx`);
}

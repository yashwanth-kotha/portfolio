// AI Ethics Decision Tree Visualization JavaScript

// Ethics scenarios and decision tree data
const ethicsData = {
    scenarios: {
        'hiring': {
            title: 'AI-Powered Hiring System',
            description: 'Your company wants to implement an AI system to screen job applicants and rank candidates.',
            risks: ['Algorithmic bias', 'Discrimination', 'Lack of transparency'],
            considerations: ['Fairness across demographics', 'Explainability of decisions', 'Human oversight']
        },
        'healthcare': {
            title: 'Medical Diagnosis AI',
            description: 'Developing an AI system to assist doctors in diagnosing diseases from medical images.',
            risks: ['Misdiagnosis consequences', 'Data privacy', 'Professional liability'],
            considerations: ['Patient safety', 'Data consent', 'Doctor-AI collaboration']
        },
        'surveillance': {
            title: 'Smart City Surveillance',
            description: 'City government wants to deploy AI-powered facial recognition for public safety.',
            risks: ['Privacy violation', 'False positives', 'Authoritarian misuse'],
            considerations: ['Public consent', 'Data protection', 'Proportionality']
        },
        'finance': {
            title: 'Credit Scoring Algorithm',
            description: 'Creating an AI model to assess creditworthiness and loan approval decisions.',
            risks: ['Financial exclusion', 'Perpetuating inequality', 'Lack of recourse'],
            considerations: ['Fair lending practices', 'Algorithmic accountability', 'Consumer rights']
        }
    },
    
    decisionTree: {
        root: {
            id: 'root',
            question: 'What is the primary purpose of your AI system?',
            options: [
                { text: 'Automation & Efficiency', next: 'automation', color: '#3b82f6' },
                { text: 'Decision Support', next: 'support', color: '#8b5cf6' },
                { text: 'Prediction & Forecasting', next: 'prediction', color: '#10b981' },
                { text: 'Content Generation', next: 'generation', color: '#f59e0b' }
            ]
        },
        
        automation: {
            id: 'automation',
            question: 'Does your system make decisions that directly affect people?',
            options: [
                { text: 'Yes, directly affects individuals', next: 'high_impact', color: '#ef4444' },
                { text: 'Minimal human impact', next: 'low_impact', color: '#10b981' }
            ]
        },
        
        support: {
            id: 'support',
            question: 'Are humans always in the loop for final decisions?',
            options: [
                { text: 'Yes, humans make final decisions', next: 'human_loop', color: '#10b981' },
                { text: 'Sometimes automated', next: 'partial_automation', color: '#f59e0b' },
                { text: 'Mostly automated', next: 'high_impact', color: '#ef4444' }
            ]
        },
        
        prediction: {
            id: 'prediction',
            question: 'What happens if your predictions are wrong?',
            options: [
                { text: 'Minor inconvenience', next: 'low_impact', color: '#10b981' },
                { text: 'Significant consequences', next: 'high_impact', color: '#ef4444' },
                { text: 'Financial/health impact', next: 'critical_impact', color: '#dc2626' }
            ]
        },
        
        generation: {
            id: 'generation',
            question: 'Could your generated content be harmful or misleading?',
            options: [
                { text: 'Low risk of harm', next: 'low_impact', color: '#10b981' },
                { text: 'Potential for misinformation', next: 'high_impact', color: '#ef4444' },
                { text: 'Could influence important decisions', next: 'critical_impact', color: '#dc2626' }
            ]
        },
        
        high_impact: {
            id: 'high_impact',
            question: 'Is your training data representative and unbiased?',
            options: [
                { text: 'Thoroughly audited for bias', next: 'bias_checked', color: '#10b981' },
                { text: 'Some bias mitigation efforts', next: 'bias_partial', color: '#f59e0b' },
                { text: 'Limited bias assessment', next: 'bias_risk', color: '#ef4444' }
            ]
        },
        
        low_impact: {
            id: 'low_impact',
            question: 'Do you have proper data governance and privacy protections?',
            options: [
                { text: 'Comprehensive privacy measures', next: 'privacy_good', color: '#10b981' },
                { text: 'Basic privacy protections', next: 'privacy_basic', color: '#f59e0b' },
                { text: 'Minimal privacy considerations', next: 'privacy_risk', color: '#ef4444' }
            ]
        },
        
        critical_impact: {
            id: 'critical_impact',
            question: 'Do you have rigorous testing and validation processes?',
            options: [
                { text: 'Extensive testing & validation', next: 'testing_good', color: '#10b981' },
                { text: 'Standard testing procedures', next: 'testing_basic', color: '#f59e0b' },
                { text: 'Limited testing', next: 'testing_risk', color: '#ef4444' }
            ]
        },
        
        human_loop: {
            id: 'human_loop',
            question: 'Are your AI recommendations explainable to users?',
            options: [
                { text: 'Fully explainable decisions', next: 'explainable_good', color: '#10b981' },
                { text: 'Partially explainable', next: 'explainable_partial', color: '#f59e0b' },
                { text: 'Black box decisions', next: 'explainable_risk', color: '#ef4444' }
            ]
        },
        
        partial_automation: {
            id: 'partial_automation',
            question: 'Do you have mechanisms for appeals and corrections?',
            options: [
                { text: 'Clear appeal process', next: 'appeals_good', color: '#10b981' },
                { text: 'Limited appeal options', next: 'appeals_partial', color: '#f59e0b' },
                { text: 'No appeal mechanism', next: 'appeals_risk', color: '#ef4444' }
            ]
        }
    },
    
    recommendations: {
        bias_checked: {
            title: 'Good Bias Management',
            status: 'low-risk',
            message: 'You\'re on the right track with bias auditing. Continue monitoring for emerging biases.',
            actions: ['Regular bias audits', 'Diverse training data', 'Fairness metrics monitoring', 'Stakeholder feedback']
        },
        
        bias_partial: {
            title: 'Moderate Bias Risk',
            status: 'medium-risk',
            message: 'Consider strengthening your bias mitigation efforts for high-impact applications.',
            actions: ['Comprehensive bias audit', 'Diverse team review', 'Algorithmic fairness testing', 'External bias assessment']
        },
        
        bias_risk: {
            title: 'High Bias Risk',
            status: 'high-risk',
            message: 'Urgent: Implement comprehensive bias assessment before deployment.',
            actions: ['Immediate bias audit', 'Training data review', 'Fairness constraints', 'Postpone deployment until addressed']
        },
        
        privacy_good: {
            title: 'Strong Privacy Protection',
            status: 'low-risk',
            message: 'Excellent privacy practices. Maintain these standards as you scale.',
            actions: ['Regular privacy reviews', 'Data minimization', 'User consent management', 'Privacy by design']
        },
        
        privacy_basic: {
            title: 'Basic Privacy Measures',
            status: 'medium-risk',
            message: 'Consider enhancing privacy protections, especially for sensitive data.',
            actions: ['Privacy impact assessment', 'Enhanced encryption', 'Data retention policies', 'User control mechanisms']
        },
        
        privacy_risk: {
            title: 'Privacy Concerns',
            status: 'high-risk',
            message: 'Implement comprehensive privacy protections before proceeding.',
            actions: ['Privacy framework adoption', 'Data protection audit', 'Consent mechanisms', 'Anonymization techniques']
        },
        
        testing_good: {
            title: 'Robust Testing Framework',
            status: 'low-risk',
            message: 'Strong testing practices for critical applications. Continue rigorous validation.',
            actions: ['Continuous testing', 'Edge case validation', 'Performance monitoring', 'Regular model updates']
        },
        
        testing_basic: {
            title: 'Standard Testing',
            status: 'medium-risk',
            message: 'For critical applications, consider more rigorous testing procedures.',
            actions: ['Enhanced test coverage', 'Stress testing', 'Real-world validation', 'Safety margins']
        },
        
        testing_risk: {
            title: 'Insufficient Testing',
            status: 'high-risk',
            message: 'Critical: Implement comprehensive testing before deployment in high-stakes environments.',
            actions: ['Comprehensive test suite', 'Third-party validation', 'Staged deployment', 'Continuous monitoring']
        },
        
        explainable_good: {
            title: 'Transparent AI Decisions',
            status: 'low-risk',
            message: 'Great explainability practices. Users can understand and trust your system.',
            actions: ['Maintain transparency', 'User education', 'Feedback incorporation', 'Documentation updates']
        },
        
        explainable_partial: {
            title: 'Limited Explainability',
            status: 'medium-risk',
            message: 'Consider improving explainability for better user trust and regulatory compliance.',
            actions: ['Interpretability tools', 'Decision summaries', 'User-friendly explanations', 'Training for human operators']
        },
        
        explainable_risk: {
            title: 'Black Box Concerns',
            status: 'high-risk',
            message: 'For decision support systems, explainability is crucial for trust and accountability.',
            actions: ['Implement explainable AI', 'Model interpretability tools', 'Decision audit trails', 'Regulatory compliance review']
        },
        
        appeals_good: {
            title: 'Good Accountability Measures',
            status: 'low-risk',
            message: 'Strong appeal mechanisms protect user rights and build trust.',
            actions: ['Appeal process optimization', 'Response time monitoring', 'Outcome tracking', 'Continuous improvement']
        },
        
        appeals_partial: {
            title: 'Limited Appeal Process',
            status: 'medium-risk',
            message: 'Consider strengthening appeal mechanisms for better user protection.',
            actions: ['Clearer appeal procedures', 'Human review options', 'Faster response times', 'Decision tracking']
        },
        
        appeals_risk: {
            title: 'No Appeal Mechanism',
            status: 'high-risk',
            message: 'Critical: Implement appeal processes to protect user rights and ensure accountability.',
            actions: ['Create appeal framework', 'Human oversight system', 'Decision reversal procedures', 'User rights protection']
        }
    }
};

// Current state
let currentNode = 'root';
let decisionPath = [];
let selectedScenario = null;

// Modal functions
function openEthicsModal() {
    loadEthicsContent();
    document.getElementById('ethicsModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        initializeEthicsTree();
        renderCurrentNode();
    }, 100);
}

function closeEthicsModal() {
    document.getElementById('ethicsModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    resetEthicsTree();
}

function loadEthicsContent() {
    const content = document.getElementById('ethics-content');
    content.innerHTML = `
        <div class="viz-header">
            <h2>AI Ethics Decision Tree</h2>
            <p style="color: #94a3b8; font-size: 1.1rem;">Navigate ethical considerations in AI development through interactive scenarios</p>
        </div>

        <!-- Scenario Selection -->
        <div style="background: rgba(51, 65, 85, 0.3); border-radius: 15px; padding: 2rem; margin: 2rem 0;">
            <h3 style="text-align: center; margin-bottom: 1.5rem; color: #f1f5f9;">Choose an AI Ethics Scenario</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;" id="scenario-cards">
                <!-- Scenario cards will be generated here -->
            </div>
        </div>

        <!-- Decision Tree Visualization -->
        <div style="background: rgba(51, 65, 85, 0.3); border-radius: 15px; padding: 2rem; margin: 2rem 0;" id="decision-tree-container">
            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 2rem;">
                <h3 style="color: #f1f5f9;">Ethical Decision Process</h3>
                <div class="controls">
                    <button class="control-button" onclick="resetEthicsTree()">Reset Tree</button>
                    <button class="control-button" onclick="showEthicsGuide()">Ethics Guide</button>
                </div>
            </div>
            
            <!-- Decision Path Breadcrumb -->
            <div style="margin-bottom: 2rem;">
                <div style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 0.5rem;">Decision Path:</div>
                <div id="decision-breadcrumb" style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
                    <!-- Breadcrumb will be generated here -->
                </div>
            </div>

            <!-- Current Decision Node -->
            <div id="current-decision" style="background: rgba(30, 41, 59, 0.5); border-radius: 10px; padding: 2rem; margin: 2rem 0;">
                <!-- Current decision content will be generated here -->
            </div>

            <!-- Recommendation Panel -->
            <div id="recommendation-panel" style="display: none; background: rgba(30, 41, 59, 0.5); border-radius: 10px; padding: 2rem; margin: 2rem 0;">
                <!-- Recommendations will be shown here -->
            </div>
        </div>

        <!-- Ethics Framework Reference -->
        <div style="background: rgba(51, 65, 85, 0.3); border-radius: 15px; padding: 2rem;">
            <h3 style="text-align: center; margin-bottom: 1.5rem; color: #f1f5f9;">AI Ethics Framework</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <div style="background: rgba(30, 41, 59, 0.5); padding: 1.5rem; border-radius: 10px; border-left: 4px solid #3b82f6;">
                    <h4 style="color: #3b82f6; margin-bottom: 0.5rem;">🎯 Fairness</h4>
                    <p style="font-size: 0.9rem; line-height: 1.4;">Ensure AI systems treat all individuals and groups equitably without discrimination.</p>
                </div>
                <div style="background: rgba(30, 41, 59, 0.5); padding: 1.5rem; border-radius: 10px; border-left: 4px solid #10b981;">
                    <h4 style="color: #10b981; margin-bottom: 0.5rem;">🔒 Privacy</h4>
                    <p style="font-size: 0.9rem; line-height: 1.4;">Protect personal data and respect individual privacy rights.</p>
                </div>
                <div style="background: rgba(30, 41, 59, 0.5); padding: 1.5rem; border-radius: 10px; border-left: 4px solid #f59e0b;">
                    <h4 style="color: #f59e0b; margin-bottom: 0.5rem;">📊 Transparency</h4>
                    <p style="font-size: 0.9rem; line-height: 1.4;">Make AI decisions explainable and understandable to stakeholders.</p>
                </div>
                <div style="background: rgba(30, 41, 59, 0.5); padding: 1.5rem; border-radius: 10px; border-left: 4px solid #8b5cf6;">
                    <h4 style="color: #8b5cf6; margin-bottom: 0.5rem;">⚖️ Accountability</h4>
                    <p style="font-size: 0.9rem; line-height: 1.4;">Establish clear responsibility and mechanisms for addressing AI decisions.</p>
                </div>
                <div style="background: rgba(30, 41, 59, 0.5); padding: 1.5rem; border-radius: 10px; border-left: 4px solid #ef4444;">
                    <h4 style="color: #ef4444; margin-bottom: 0.5rem;">🛡️ Safety</h4>
                    <p style="font-size: 0.9rem; line-height: 1.4;">Minimize harm and ensure reliable, secure AI system operation.</p>
                </div>
                <div style="background: rgba(30, 41, 59, 0.5); padding: 1.5rem; border-radius: 10px; border-left: 4px solid #06b6d4;">
                    <h4 style="color: #06b6d4; margin-bottom: 0.5rem;">👥 Human Agency</h4>
                    <p style="font-size: 0.9rem; line-height: 1.4;">Preserve human control and decision-making authority where appropriate.</p>
                </div>
            </div>
        </div>
    `;
}

function initializeEthicsTree() {
    // Generate scenario cards
    const scenarioContainer = document.getElementById('scenario-cards');
    scenarioContainer.innerHTML = '';
    
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];
    
    Object.entries(ethicsData.scenarios).forEach(([key, scenario], index) => {
        const card = document.createElement('div');
        card.className = 'scenario-card';
        card.style.background = 'rgba(30, 41, 59, 0.5)';
        card.style.padding = '1.5rem';
        card.style.borderRadius = '10px';
        card.style.cursor = 'pointer';
        card.style.transition = 'all 0.3s';
        card.style.border = '1px solid rgba(148, 163, 184, 0.1)';
        
        card.innerHTML = `
            <h4 style="color: ${colors[index]}; margin-bottom: 1rem;">${scenario.title}</h4>
            <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 1rem;">${scenario.description}</p>
            <div style="margin-bottom: 1rem;">
                <div style="color: #ef4444; font-size: 0.8rem; margin-bottom: 0.5rem;">Key Risks:</div>
                <div style="color: #cbd5e1; font-size: 0.8rem;">${scenario.risks.join(', ')}</div>
            </div>
            <div>
                <div style="color: #10b981; font-size: 0.8rem; margin-bottom: 0.5rem;">Considerations:</div>
                <div style="color: #cbd5e1; font-size: 0.8rem;">${scenario.considerations.join(', ')}</div>
            </div>
        `;
        
        card.addEventListener('click', () => selectScenario(key, card));
        card.addEventListener('mouseover', () => {
            card.style.transform = 'translateY(-3px)';
            card.style.borderColor = colors[index];
        });
        card.addEventListener('mouseout', () => {
            if (selectedScenario !== key) {
                card.style.transform = 'translateY(0)';
                card.style.borderColor = 'rgba(148, 163, 184, 0.1)';
            }
        });
        
        scenarioContainer.appendChild(card);
    });
}

function selectScenario(scenarioKey, cardElement) {
    // Reset previous selection
    document.querySelectorAll('.scenario-card').forEach(card => {
        card.style.transform = 'translateY(0)';
        card.style.borderColor = 'rgba(148, 163, 184, 0.1)';
        card.style.background = 'rgba(30, 41, 59, 0.5)';
    });
    
    // Highlight selected scenario
    cardElement.style.borderColor = '#3b82f6';
    cardElement.style.background = 'rgba(59, 130, 246, 0.1)';
    
    selectedScenario = scenarioKey;
    
    // Show decision tree
    document.getElementById('decision-tree-container').style.display = 'block';
    
    // Start the decision process
    resetEthicsTree();
}

function renderCurrentNode() {
    const node = ethicsData.decisionTree[currentNode];
    if (!node) return;
    
    const container = document.getElementById('current-decision');
    
    if (ethicsData.recommendations[currentNode]) {
        // Show recommendation
        showRecommendation(currentNode);
        return;
    }
    
    container.innerHTML = `
        <h4 style="color: #f1f5f9; margin-bottom: 1.5rem; font-size: 1.2rem;">${node.question}</h4>
        <div style="display: grid; gap: 1rem;">
            ${node.options.map((option, index) => `
                <button class="ethics-option" data-next="${option.next}" 
                        style="background: rgba(${getRGBFromHex(option.color)}, 0.1); 
                               border: 1px solid ${option.color}; 
                               color: #f1f5f9; 
                               padding: 1rem; 
                               border-radius: 8px; 
                               cursor: pointer; 
                               transition: all 0.3s;
                               text-align: left;
                               font-size: 1rem;">
                    ${option.text}
                </button>
            `).join('')}
        </div>
    `;
    
    // Add click handlers
    container.querySelectorAll('.ethics-option').forEach(button => {
        button.addEventListener('click', (e) => {
            const nextNode = e.target.dataset.next;
            decisionPath.push({
                question: node.question,
                answer: e.target.textContent.trim()
            });
            currentNode = nextNode;
            renderCurrentNode();
            updateBreadcrumb();
        });
        
        button.addEventListener('mouseover', (e) => {
            e.target.style.transform = 'translateX(5px)';
            e.target.style.boxShadow = '0 5px 15px rgba(59, 130, 246, 0.2)';
        });
        
        button.addEventListener('mouseout', (e) => {
            e.target.style.transform = 'translateX(0)';
            e.target.style.boxShadow = 'none';
        });
    });
    
    updateBreadcrumb();
}

function showRecommendation(recommendationKey) {
    const recommendation = ethicsData.recommendations[recommendationKey];
    const container = document.getElementById('current-decision');
    const recPanel = document.getElementById('recommendation-panel');
    
    container.style.display = 'none';
    recPanel.style.display = 'block';
    
    const statusColors = {
        'low-risk': '#10b981',
        'medium-risk': '#f59e0b',
        'high-risk': '#ef4444'
    };
    
    recPanel.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <div style="width: 80px; height: 80px; margin: 0 auto 1rem; border-radius: 50%; 
                        background: ${statusColors[recommendation.status]}; 
                        display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                ${recommendation.status === 'low-risk' ? '✅' : recommendation.status === 'medium-risk' ? '⚠️' : '🚨'}
            </div>
            <h3 style="color: ${statusColors[recommendation.status]}; margin-bottom: 1rem;">${recommendation.title}</h3>
            <p style="color: #cbd5e1; font-size: 1.1rem; max-width: 600px; margin: 0 auto;">${recommendation.message}</p>
        </div>
        
        <div style="background: rgba(30, 41, 59, 0.5); border-radius: 10px; padding: 2rem;">
            <h4 style="color: #f1f5f9; margin-bottom: 1rem;">Recommended Actions:</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                ${recommendation.actions.map(action => `
                    <div style="background: rgba(${getRGBFromHex(statusColors[recommendation.status])}, 0.1); 
                                padding: 1rem; border-radius: 8px; border-left: 3px solid ${statusColors[recommendation.status]};">
                        <span style="color: #cbd5e1;">${action}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 2rem;">
            <button class="control-button" onclick="resetEthicsTree()" style="margin-right: 1rem;">Try Another Path</button>
            <button class="control-button" onclick="exportDecisionPath()">Export Decision Report</button>
        </div>
    `;
}

function updateBreadcrumb() {
    const container = document.getElementById('decision-breadcrumb');
    container.innerHTML = '';
    
    decisionPath.forEach((step, index) => {
        const breadcrumb = document.createElement('div');
        breadcrumb.style.display = 'flex';
        breadcrumb.style.alignItems = 'center';
        breadcrumb.style.gap = '0.5rem';
        
        breadcrumb.innerHTML = `
            <div style="background: rgba(59, 130, 246, 0.2); color: #3b82f6; padding: 0.25rem 0.75rem; 
                        border-radius: 15px; font-size: 0.8rem; border: 1px solid #3b82f6;">
                ${step.answer}
            </div>
            ${index < decisionPath.length - 1 ? '<span style="color: #94a3b8;">→</span>' : ''}
        `;
        
        container.appendChild(breadcrumb);
    });
}

function resetEthicsTree() {
    currentNode = 'root';
    decisionPath = [];
    document.getElementById('current-decision').style.display = 'block';
    document.getElementById('recommendation-panel').style.display = 'none';
    renderCurrentNode();
}

function showEthicsGuide() {
    alert('AI Ethics Guide:\n\n1. Consider all stakeholders affected by your AI system\n2. Assess potential risks and unintended consequences\n3. Implement appropriate safeguards and monitoring\n4. Ensure transparency and explainability where needed\n5. Establish accountability mechanisms\n6. Regular audit and update your ethical practices\n\nThis decision tree helps guide you through key considerations, but every situation requires careful analysis.');
}

function exportDecisionPath() {
    const report = {
        scenario: selectedScenario ? ethicsData.scenarios[selectedScenario].title : 'General Ethics Assessment',
        decisionPath: decisionPath,
        recommendation: ethicsData.recommendations[currentNode],
        timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-ethics-decision-report.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Helper functions
function getRGBFromHex(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}

// Add CSS for ethics components
const ethicsStyles = `
.scenario-card:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.1);
}

.ethics-option:hover {
    transform: translateX(5px) !important;
}

.ethics-option:active {
    transform: translateX(5px) scale(0.98);
}

@keyframes pulse-ethical {
    0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
    100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
}

.ethical-highlight {
    animation: pulse-ethical 2s infinite;
}
`;

// Inject ethics styles
if (!document.getElementById('ethics-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'ethics-styles';
    styleSheet.textContent = ethicsStyles;
    document.head.appendChild(styleSheet);
}
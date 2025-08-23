// Model Evaluation Visualization
let modelEvalChart = null;
let confusionMatrixChart = null;
let rocCurveChart = null;
let lossChart = null;

// Sample neural network evaluation data
const modelData = {
    metrics: {
        accuracy: 0.94,
        precision: 0.92,
        recall: 0.89,
        f1Score: 0.905,
        auc: 0.96
    },
    confusionMatrix: [
        [85, 5, 3, 2],
        [4, 88, 6, 2],
        [2, 7, 86, 5],
        [1, 3, 4, 92]
    ],
    rocData: [
        {fpr: 0, tpr: 0},
        {fpr: 0.02, tpr: 0.15},
        {fpr: 0.05, tpr: 0.35},
        {fpr: 0.08, tpr: 0.55},
        {fpr: 0.12, tpr: 0.75},
        {fpr: 0.18, tpr: 0.85},
        {fpr: 0.25, tpr: 0.92},
        {fpr: 0.35, tpr: 0.96},
        {fpr: 0.5, tpr: 0.98},
        {fpr: 1, tpr: 1}
    ],
    trainingHistory: {
        epochs: Array.from({length: 50}, (_, i) => i + 1),
        trainLoss: [2.3, 1.8, 1.5, 1.2, 1.0, 0.9, 0.8, 0.75, 0.7, 0.65, 0.6, 0.58, 0.55, 0.52, 0.5, 0.48, 0.46, 0.44, 0.42, 0.4, 0.39, 0.38, 0.37, 0.36, 0.35, 0.34, 0.33, 0.32, 0.31, 0.3, 0.29, 0.28, 0.27, 0.26, 0.25, 0.24, 0.23, 0.22, 0.21, 0.2, 0.19, 0.18, 0.17, 0.16, 0.15, 0.14, 0.13, 0.12, 0.11, 0.1],
        valLoss: [2.4, 1.9, 1.6, 1.3, 1.1, 1.0, 0.9, 0.85, 0.8, 0.75, 0.7, 0.68, 0.66, 0.64, 0.62, 0.6, 0.58, 0.56, 0.54, 0.52, 0.51, 0.5, 0.49, 0.48, 0.47, 0.46, 0.45, 0.44, 0.43, 0.42, 0.41, 0.4, 0.39, 0.38, 0.37, 0.36, 0.35, 0.34, 0.33, 0.32, 0.31, 0.3, 0.29, 0.28, 0.27, 0.26, 0.25, 0.24, 0.23, 0.22]
    },
    classes: ['Class A', 'Class B', 'Class C', 'Class D']
};

function openModelEvalModal() {
    const modal = document.getElementById('modelEvalModal');
    const content = document.getElementById('model-eval-content');
    
    content.innerHTML = `
        <div class="viz-header">
            <h2>Neural Network Model Evaluation Dashboard</h2>
            <p>Learn how to evaluate neural network performance through comprehensive metrics and visualizations</p>
        </div>
        
        <div class="model-eval-dashboard">
            <div class="education-section">
                <h3>🧠 What is Neural Network Model Evaluation?</h3>
                <div class="explanation-card">
                    <p><strong>Model evaluation</strong> is the process of assessing how well a neural network performs on unseen data. It's like giving your AI model a final exam to see if it truly learned the patterns, not just memorized the training examples.</p>
                    <p>We use multiple metrics and visualizations because no single number tells the complete story. Each metric reveals different aspects of model performance, helping us understand strengths, weaknesses, and potential biases.</p>
                </div>
            </div>

            <div class="metrics-overview">
                <h3>📊 Performance Metrics Explained</h3>
                <div class="metrics-explanation">
                    <p>These five key metrics each tell us something different about our model's performance:</p>
                </div>
                <div class="metrics-grid">
                    <div class="metric-card" data-tooltip="Overall correctness: How many predictions were right out of all predictions made">
                        <div class="metric-value">${(modelData.metrics.accuracy * 100).toFixed(1)}%</div>
                        <div class="metric-label">Accuracy</div>
                        <div class="metric-explanation">Correct predictions ÷ Total predictions</div>
                    </div>
                    <div class="metric-card" data-tooltip="Quality of positive predictions: When model says 'yes', how often is it right?">
                        <div class="metric-value">${(modelData.metrics.precision * 100).toFixed(1)}%</div>
                        <div class="metric-label">Precision</div>
                        <div class="metric-explanation">True Positives ÷ (True + False Positives)</div>
                    </div>
                    <div class="metric-card" data-tooltip="Completeness: How many actual positive cases did we find?">
                        <div class="metric-value">${(modelData.metrics.recall * 100).toFixed(1)}%</div>
                        <div class="metric-label">Recall</div>
                        <div class="metric-explanation">True Positives ÷ (True Positives + False Negatives)</div>
                    </div>
                    <div class="metric-card" data-tooltip="Balance between precision and recall - the harmonic mean of both">
                        <div class="metric-value">${(modelData.metrics.f1Score * 100).toFixed(1)}%</div>
                        <div class="metric-label">F1-Score</div>
                        <div class="metric-explanation">2 × (Precision × Recall) ÷ (Precision + Recall)</div>
                    </div>
                    <div class="metric-card" data-tooltip="Area Under ROC Curve: Overall discriminative ability across all thresholds">
                        <div class="metric-value">${(modelData.metrics.auc * 100).toFixed(1)}%</div>
                        <div class="metric-label">AUC</div>
                        <div class="metric-explanation">Area under the ROC curve (0.5 = random, 1.0 = perfect)</div>
                    </div>
                </div>
            </div>
            
            <div class="viz-container">
                <div class="viz-section">
                    <h4>🎯 Confusion Matrix</h4>
                    <div class="viz-explanation">
                        <p><strong>What it shows:</strong> A table showing actual vs predicted classifications. Each cell represents the count of predictions.</p>
                        <p><strong>How to read it:</strong> Diagonal cells (dark blue) are correct predictions. Off-diagonal cells are mistakes.</p>
                        <p><strong>Why it matters:</strong> Reveals which classes the model confuses with each other, helping identify specific weaknesses.</p>
                    </div>
                    <div id="confusion-matrix"></div>
                </div>
                <div class="viz-section">
                    <h4>📈 ROC Curve</h4>
                    <div class="viz-explanation">
                        <p><strong>What it shows:</strong> True Positive Rate vs False Positive Rate at different classification thresholds.</p>
                        <p><strong>How to read it:</strong> Curve closer to top-left corner = better performance. Diagonal line = random guessing.</p>
                        <p><strong>Why it matters:</strong> Shows model's discriminative ability independent of class distribution or chosen threshold.</p>
                    </div>
                    <div id="roc-curve"></div>
                </div>
            </div>
            
            <div class="viz-section full-width">
                <h4>📉 Training History</h4>
                <div class="viz-explanation">
                    <p><strong>What it shows:</strong> How the model's loss (error) decreased during training for both training and validation data.</p>
                    <p><strong>How to read it:</strong> Both lines should decrease and converge. Large gap = overfitting. Increasing validation loss = overfitting.</p>
                    <p><strong>Why it matters:</strong> Reveals if the model learned generalizable patterns or just memorized training data.</p>
                </div>
                <div id="loss-curve"></div>
            </div>

            <div class="evaluation-guide">
                <h4>🎓 Evaluation Best Practices</h4>
                <div class="guide-grid">
                    <div class="guide-card">
                        <h5>1. Use Multiple Metrics</h5>
                        <p>Never rely on accuracy alone. Different metrics reveal different aspects of performance, especially with imbalanced datasets.</p>
                    </div>
                    <div class="guide-card">
                        <h5>2. Understand Your Data</h5>
                        <p>Know your class distribution, data quality, and business requirements to choose appropriate evaluation criteria.</p>
                    </div>
                    <div class="guide-card">
                        <h5>3. Check for Overfitting</h5>
                        <p>Monitor training vs validation performance. Large gaps indicate the model memorized rather than learned.</p>
                    </div>
                    <div class="guide-card">
                        <h5>4. Consider Real-World Impact</h5>
                        <p>Think about the cost of false positives vs false negatives in your specific application domain.</p>
                    </div>
                </div>
            </div>
            
            <div class="model-insights">
                <h4>💡 This Model's Performance Analysis</h4>
                <div class="insights-grid">
                    <div class="insight-card">
                        <h5>🎯 Excellent Overall Performance</h5>
                        <p>94% accuracy indicates the model correctly classifies most examples. This is well above random chance (25% for 4 classes).</p>
                    </div>
                    <div class="insight-card">
                        <h5>⚖️ Well-Balanced Metrics</h5>
                        <p>Precision (92%) and recall (89%) are close, showing the model doesn't heavily favor either conservative or aggressive predictions.</p>
                    </div>
                    <div class="insight-card">
                        <h5>📈 Strong Discriminative Power</h5>
                        <p>AUC of 96% means the model can distinguish between classes very well across all decision thresholds.</p>
                    </div>
                    <div class="insight-card">
                        <h5>🔄 Healthy Training Process</h5>
                        <p>Training and validation losses converge smoothly without significant overfitting, indicating robust learning.</p>
                    </div>
                </div>
            </div>

            <div class="key-takeaways">
                <h4>🔑 Key Takeaways for Neural Network Evaluation</h4>
                <div class="takeaway-list">
                    <div class="takeaway-item">
                        <strong>Holistic Assessment:</strong> Use multiple metrics and visualizations to get a complete picture of model performance.
                    </div>
                    <div class="takeaway-item">
                        <strong>Context Matters:</strong> The "best" model depends on your specific use case, data distribution, and business requirements.
                    </div>
                    <div class="takeaway-item">
                        <strong>Continuous Monitoring:</strong> Model performance can degrade over time as real-world data changes (concept drift).
                    </div>
                    <div class="takeaway-item">
                        <strong>Interpretability:</strong> Understanding why a model makes certain predictions is often as important as accuracy.
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Create visualizations after modal is displayed
    setTimeout(() => {
        createConfusionMatrix();
        createROCCurve();
        createLossCurve();
    }, 100);
}

function createConfusionMatrix() {
    const container = d3.select('#confusion-matrix');
    container.selectAll('*').remove();
    
    const margin = {top: 20, right: 20, bottom: 60, left: 60};
    const width = 300 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);
    
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const cellSize = Math.min(width, height) / 4;
    const maxValue = d3.max(modelData.confusionMatrix.flat());
    const colorScale = d3.scaleSequential(d3.interpolateBlues)
        .domain([0, maxValue]);
    
    // Create cells
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const value = modelData.confusionMatrix[i][j];
            
            g.append('rect')
                .attr('x', j * cellSize)
                .attr('y', i * cellSize)
                .attr('width', cellSize)
                .attr('height', cellSize)
                .attr('fill', colorScale(value))
                .attr('stroke', '#334155')
                .attr('stroke-width', 1);
            
            g.append('text')
                .attr('x', j * cellSize + cellSize / 2)
                .attr('y', i * cellSize + cellSize / 2)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .attr('fill', value > maxValue / 2 ? 'white' : 'black')
                .attr('font-size', '14px')
                .attr('font-weight', 'bold')
                .text(value);
        }
    }
    
    // Add labels
    g.selectAll('.row-label')
        .data(modelData.classes)
        .enter()
        .append('text')
        .attr('class', 'row-label')
        .attr('x', -10)
        .attr('y', (d, i) => i * cellSize + cellSize / 2)
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle')
        .attr('fill', '#e2e8f0')
        .attr('font-size', '12px')
        .text(d => d);
    
    g.selectAll('.col-label')
        .data(modelData.classes)
        .enter()
        .append('text')
        .attr('class', 'col-label')
        .attr('x', (d, i) => i * cellSize + cellSize / 2)
        .attr('y', 4 * cellSize + 20)
        .attr('text-anchor', 'middle')
        .attr('fill', '#e2e8f0')
        .attr('font-size', '12px')
        .text(d => d);
    
    // Add axis labels
    g.append('text')
        .attr('x', 2 * cellSize)
        .attr('y', 4 * cellSize + 45)
        .attr('text-anchor', 'middle')
        .attr('fill', '#94a3b8')
        .attr('font-size', '14px')
        .text('Predicted');
    
    g.append('text')
        .attr('x', -35)
        .attr('y', 2 * cellSize)
        .attr('text-anchor', 'middle')
        .attr('fill', '#94a3b8')
        .attr('font-size', '14px')
        .attr('transform', `rotate(-90, -35, ${2 * cellSize})`)
        .text('Actual');
}

function createROCCurve() {
    const container = d3.select('#roc-curve');
    container.selectAll('*').remove();
    
    const margin = {top: 20, right: 20, bottom: 40, left: 40};
    const width = 300 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);
    
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const xScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, width]);
    
    const yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([height, 0]);
    
    const line = d3.line()
        .x(d => xScale(d.fpr))
        .y(d => yScale(d.tpr))
        .curve(d3.curveMonotoneX);
    
    // Add diagonal reference line
    g.append('line')
        .attr('x1', 0)
        .attr('y1', height)
        .attr('x2', width)
        .attr('y2', 0)
        .attr('stroke', '#64748b')
        .attr('stroke-dasharray', '3,3')
        .attr('stroke-width', 1);
    
    // Add ROC curve
    g.append('path')
        .datum(modelData.rocData)
        .attr('fill', 'none')
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 3)
        .attr('d', line);
    
    // Add points
    g.selectAll('.roc-point')
        .data(modelData.rocData)
        .enter()
        .append('circle')
        .attr('class', 'roc-point')
        .attr('cx', d => xScale(d.fpr))
        .attr('cy', d => yScale(d.tpr))
        .attr('r', 3)
        .attr('fill', '#3b82f6')
        .attr('stroke', '#1e40af')
        .attr('stroke-width', 1);
    
    // Add axes
    g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .attr('fill', '#94a3b8');
    
    g.append('g')
        .call(d3.axisLeft(yScale))
        .selectAll('text')
        .attr('fill', '#94a3b8');
    
    // Add axis labels
    g.append('text')
        .attr('x', width / 2)
        .attr('y', height + 35)
        .attr('text-anchor', 'middle')
        .attr('fill', '#94a3b8')
        .attr('font-size', '12px')
        .text('False Positive Rate');
    
    g.append('text')
        .attr('x', -height / 2)
        .attr('y', -25)
        .attr('text-anchor', 'middle')
        .attr('fill', '#94a3b8')
        .attr('font-size', '12px')
        .attr('transform', `rotate(-90, -${height / 2}, -25)`)
        .text('True Positive Rate');
    
    // Add AUC text
    g.append('text')
        .attr('x', width - 10)
        .attr('y', height - 10)
        .attr('text-anchor', 'end')
        .attr('fill', '#3b82f6')
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .text(`AUC = ${modelData.metrics.auc.toFixed(3)}`);
}

function createLossCurve() {
    const container = d3.select('#loss-curve');
    container.selectAll('*').remove();
    
    const margin = {top: 20, right: 80, bottom: 40, left: 60};
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);
    
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const xScale = d3.scaleLinear()
        .domain([1, 50])
        .range([0, width]);
    
    const yScale = d3.scaleLinear()
        .domain([0, 2.5])
        .range([height, 0]);
    
    const line = d3.line()
        .x((d, i) => xScale(i + 1))
        .y(d => yScale(d))
        .curve(d3.curveMonotoneX);
    
    // Add training loss line
    g.append('path')
        .datum(modelData.trainingHistory.trainLoss)
        .attr('fill', 'none')
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 2)
        .attr('d', line);
    
    // Add validation loss line
    g.append('path')
        .datum(modelData.trainingHistory.valLoss)
        .attr('fill', 'none')
        .attr('stroke', '#ef4444')
        .attr('stroke-width', 2)
        .attr('d', line);
    
    // Add axes
    g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .attr('fill', '#94a3b8');
    
    g.append('g')
        .call(d3.axisLeft(yScale))
        .selectAll('text')
        .attr('fill', '#94a3b8');
    
    // Add axis labels
    g.append('text')
        .attr('x', width / 2)
        .attr('y', height + 35)
        .attr('text-anchor', 'middle')
        .attr('fill', '#94a3b8')
        .attr('font-size', '12px')
        .text('Epoch');
    
    g.append('text')
        .attr('x', -height / 2)
        .attr('y', -40)
        .attr('text-anchor', 'middle')
        .attr('fill', '#94a3b8')
        .attr('font-size', '12px')
        .attr('transform', `rotate(-90, -${height / 2}, -40)`)
        .text('Loss');
    
    // Add legend
    const legend = g.append('g')
        .attr('transform', `translate(${width + 10}, 20)`);
    
    legend.append('line')
        .attr('x1', 0)
        .attr('x2', 20)
        .attr('y1', 0)
        .attr('y2', 0)
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 2);
    
    legend.append('text')
        .attr('x', 25)
        .attr('y', 5)
        .attr('fill', '#94a3b8')
        .attr('font-size', '12px')
        .text('Training Loss');
    
    legend.append('line')
        .attr('x1', 0)
        .attr('x2', 20)
        .attr('y1', 20)
        .attr('y2', 20)
        .attr('stroke', '#ef4444')
        .attr('stroke-width', 2);
    
    legend.append('text')
        .attr('x', 25)
        .attr('y', 25)
        .attr('fill', '#94a3b8')
        .attr('font-size', '12px')
        .text('Validation Loss');
}

function closeModelEvalModal() {
    document.getElementById('modelEvalModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modelEvalModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

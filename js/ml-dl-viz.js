// ML vs DL Visualization JavaScript

// Performance data for different domains
const performanceData = {
    'image': {
        title: 'Image Recognition Performance',
        data: [
            { method: 'Traditional ML', accuracy: 75, training_time: 2, complexity: 3 },
            { method: 'Deep Learning', accuracy: 95, training_time: 8, complexity: 9 }
        ]
    },
    'nlp': {
        title: 'Natural Language Processing Performance',
        data: [
            { method: 'Traditional ML', accuracy: 70, training_time: 1, complexity: 4 },
            { method: 'Deep Learning', accuracy: 92, training_time: 12, complexity: 10 }
        ]
    },
    'structured': {
        title: 'Structured Data Performance',
        data: [
            { method: 'Traditional ML', accuracy: 88, training_time: 1, complexity: 2 },
            { method: 'Deep Learning', accuracy: 85, training_time: 6, complexity: 8 }
        ]
    },
    'time-series': {
        title: 'Time Series Forecasting Performance',
        data: [
            { method: 'Traditional ML', accuracy: 78, training_time: 2, complexity: 3 },
            { method: 'Deep Learning', accuracy: 89, training_time: 10, complexity: 9 }
        ]
    }
};

// Modal functions
function openMLDLModal() {
    // Load ML vs DL content
    loadMLDLContent();
    document.getElementById('mlDlModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        createNetworkVisualization('ml-network', false);
        createNetworkVisualization('dl-network', true);
        showChart('image');
    }, 100);
}

function closeMLDLModal() {
    document.getElementById('mlDlModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function loadMLDLContent() {
    const content = document.getElementById('ml-dl-content');
    content.innerHTML = `
        <div class="viz-header">
            <h2>Machine Learning vs Deep Learning</h2>
            <p style="color: #94a3b8; font-size: 1.1rem;">An interactive exploration of two foundational approaches in artificial intelligence</p>
        </div>

        <div class="viz-container">
            <div class="viz-section ml-section">
                <h3 style="color: #3b82f6;">🧠 Machine Learning</h3>
                <div class="network-visualization" id="ml-network"></div>
                <p style="text-align: center; color: #94a3b8; font-size: 0.9rem;">
                    Traditional algorithms using feature engineering
                </p>
            </div>

            <div class="viz-section dl-section">
                <h3 style="color: #8b5cf6;">🔥 Deep Learning</h3>
                <div class="network-visualization" id="dl-network"></div>
                <p style="text-align: center; color: #94a3b8; font-size: 0.9rem;">
                    Neural networks with multiple hidden layers
                </p>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 2rem 0;">
            <div style="background: rgba(30, 41, 59, 0.5); padding: 1rem; border-radius: 10px; text-align: center;">
                <h4 style="color: #f59e0b; margin-bottom: 0.5rem;">📊 Data Requirements</h4>
                <p style="color: #3b82f6; margin: 0.5rem 0;">Machine Learning</p>
                <div style="width: 100%; height: 15px; background: rgba(30, 41, 59, 0.5); border-radius: 8px; overflow: hidden; margin: 0.5rem 0;">
                    <div style="height: 100%; width: 60%; background: linear-gradient(90deg, #3b82f6, #1d4ed8); border-radius: 8px; transition: width 1s ease;"></div>
                </div>
                <p style="color: #8b5cf6; margin: 0.5rem 0;">Deep Learning</p>
                <div style="width: 100%; height: 15px; background: rgba(30, 41, 59, 0.5); border-radius: 8px; overflow: hidden; margin: 0.5rem 0;">
                    <div style="height: 100%; width: 95%; background: linear-gradient(90deg, #8b5cf6, #6d28d9); border-radius: 8px; transition: width 1s ease;"></div>
                </div>
            </div>

            <div style="background: rgba(30, 41, 59, 0.5); padding: 1rem; border-radius: 10px; text-align: center;">
                <h4 style="color: #f59e0b; margin-bottom: 0.5rem;">⚡ Computational Power</h4>
                <p style="color: #3b82f6; margin: 0.5rem 0;">Machine Learning</p>
                <div style="width: 100%; height: 15px; background: rgba(30, 41, 59, 0.5); border-radius: 8px; overflow: hidden; margin: 0.5rem 0;">
                    <div style="height: 100%; width: 40%; background: linear-gradient(90deg, #3b82f6, #1d4ed8); border-radius: 8px; transition: width 1s ease;"></div>
                </div>
                <p style="color: #8b5cf6; margin: 0.5rem 0;">Deep Learning</p>
                <div style="width: 100%; height: 15px; background: rgba(30, 41, 59, 0.5); border-radius: 8px; overflow: hidden; margin: 0.5rem 0;">
                    <div style="height: 100%; width: 90%; background: linear-gradient(90deg, #8b5cf6, #6d28d9); border-radius: 8px; transition: width 1s ease;"></div>
                </div>
            </div>

            <div style="background: rgba(30, 41, 59, 0.5); padding: 1rem; border-radius: 10px; text-align: center;">
                <h4 style="color: #f59e0b; margin-bottom: 0.5rem;">🎯 Interpretability</h4>
                <p style="color: #3b82f6; margin: 0.5rem 0;">Machine Learning</p>
                <div style="width: 100%; height: 15px; background: rgba(30, 41, 59, 0.5); border-radius: 8px; overflow: hidden; margin: 0.5rem 0;">
                    <div style="height: 100%; width: 85%; background: linear-gradient(90deg, #3b82f6, #1d4ed8); border-radius: 8px; transition: width 1s ease;"></div>
                </div>
                <p style="color: #8b5cf6; margin: 0.5rem 0;">Deep Learning</p>
                <div style="width: 100%; height: 15px; background: rgba(30, 41, 59, 0.5); border-radius: 8px; overflow: hidden; margin: 0.5rem 0;">
                    <div style="height: 100%; width: 25%; background: linear-gradient(90deg, #8b5cf6, #6d28d9); border-radius: 8px; transition: width 1s ease;"></div>
                </div>
            </div>
        </div>

        <div style="background: rgba(51, 65, 85, 0.3); border-radius: 15px; padding: 2rem; margin: 2rem 0;">
            <h3 style="text-align: center; margin-bottom: 1.5rem; color: #f1f5f9;">Performance Across Domains</h3>
            <div class="controls">
                <button class="control-button active" onclick="showChart('image')">Image Recognition</button>
                <button class="control-button" onclick="showChart('nlp')">Natural Language Processing</button>
                <button class="control-button" onclick="showChart('structured')">Structured Data</button>
                <button class="control-button" onclick="showChart('time-series')">Time Series</button>
            </div>
            <div style="width: 100%; height: 300px; margin: 1rem 0; background: rgba(30, 41, 59, 0.3); border-radius: 10px; padding: 1rem;" id="performance-chart"></div>
            <div style="display: flex; justify-content: center; gap: 2rem; margin: 1rem 0;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div style="width: 15px; height: 15px; border-radius: 50%; background: #3b82f6;"></div>
                    <span>Machine Learning</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div style="width: 15px; height: 15px; border-radius: 50%; background: #8b5cf6;"></div>
                    <span>Deep Learning</span>
                </div>
            </div>
        </div>

        <div style="background: rgba(51, 65, 85, 0.3); border-radius: 15px; padding: 2rem;">
            <h3 style="text-align: center; margin-bottom: 1.5rem; color: #f1f5f9;">Key Insights & Applications</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
                <div style="background: rgba(30, 41, 59, 0.5); padding: 1.5rem; border-radius: 10px; border-left: 4px solid #3b82f6;">
                    <h4 style="color: #3b82f6; margin-bottom: 0.5rem;">When to Use Machine Learning</h4>
                    <p style="font-size: 0.9rem; line-height: 1.4;">• Limited data (< 10k samples)<br>
                    • Need for model interpretability<br>
                    • Structured/tabular data<br>
                    • Limited computational resources<br>
                    • Simple pattern recognition tasks</p>
                </div>
                <div style="background: rgba(30, 41, 59, 0.5); padding: 1.5rem; border-radius: 10px; border-left: 4px solid #8b5cf6;">
                    <h4 style="color: #8b5cf6; margin-bottom: 0.5rem;">When to Use Deep Learning</h4>
                    <p style="font-size: 0.9rem; line-height: 1.4;">• Large datasets (100k+ samples)<br>
                    • Complex pattern recognition<br>
                    • Image, audio, or text data<br>
                    • High computational resources<br>
                    • State-of-the-art performance needed</p>
                </div>
                <div style="background: rgba(30, 41, 59, 0.5); padding: 1.5rem; border-radius: 10px; border-left: 4px solid #f59e0b;">
                    <h4 style="color: #f59e0b; margin-bottom: 0.5rem;">Future Trends</h4>
                    <p style="font-size: 0.9rem; line-height: 1.4;">• Hybrid approaches combining both<br>
                    • AutoML for automated selection<br>
                    • Edge AI for mobile deployment<br>
                    • Explainable AI for deep learning<br>
                    • Transfer learning reducing data needs</p>
                </div>
            </div>
        </div>
    `;
}

function createNetworkVisualization(containerId, isDeepLearning) {
    const container = d3.select(`#${containerId}`);
    container.selectAll('*').remove();
    
    const svg = container.append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 300 180');

    const width = 300;
    const height = 180;

    if (isDeepLearning) {
        // Deep Learning Network (Multiple Layers)
        const layers = [3, 5, 5, 3, 1];
        const layerSpacing = width / (layers.length + 1);
        
        layers.forEach((nodeCount, layerIndex) => {
            const nodeSpacing = height / (nodeCount + 1);
            
            for (let i = 0; i < nodeCount; i++) {
                const cx = layerSpacing * (layerIndex + 1);
                const cy = nodeSpacing * (i + 1);
                
                svg.append('circle')
                    .attr('cx', cx)
                    .attr('cy', cy)
                    .attr('r', 6)
                    .attr('fill', '#8b5cf6')
                    .attr('opacity', 0)
                    .transition()
                    .delay(layerIndex * 150 + i * 50)
                    .duration(400)
                    .attr('opacity', 0.8);

                // Add connections to next layer
                if (layerIndex < layers.length - 1) {
                    const nextNodeCount = layers[layerIndex + 1];
                    const nextNodeSpacing = height / (nextNodeCount + 1);
                    
                    for (let j = 0; j < nextNodeCount; j++) {
                        const nextCx = layerSpacing * (layerIndex + 2);
                        const nextCy = nextNodeSpacing * (j + 1);
                        
                        svg.append('line')
                            .attr('x1', cx)
                            .attr('y1', cy)
                            .attr('x2', nextCx)
                            .attr('y2', nextCy)
                            .attr('stroke', '#8b5cf6')
                            .attr('stroke-width', 1)
                            .attr('opacity', 0)
                            .transition()
                            .delay(layerIndex * 150 + i * 50 + 200)
                            .duration(300)
                            .attr('opacity', 0.3);
                    }
                }
            }
        });
    } else {
        // Traditional ML (Simple Structure)
        const nodes = [
            { x: 40, y: 60, label: 'Input' },
            { x: 100, y: 40, label: 'Features' },
            { x: 100, y: 80, label: 'Algorithm' },
            { x: 180, y: 60, label: 'Model' },
            { x: 240, y: 60, label: 'Output' }
        ];

        const connections = [
            [0, 1], [0, 2], [1, 3], [2, 3], [3, 4]
        ];

        // Draw connections first
        connections.forEach((connection, index) => {
            const source = nodes[connection[0]];
            const target = nodes[connection[1]];
            
            svg.append('line')
                .attr('x1', source.x)
                .attr('y1', source.y)
                .attr('x2', target.x)
                .attr('y2', target.y)
                .attr('stroke', '#3b82f6')
                .attr('stroke-width', 2)
                .attr('opacity', 0)
                .transition()
                .delay(index * 150 + 300)
                .duration(300)
                .attr('opacity', 0.6);
        });

        // Draw nodes
        nodes.forEach((node, index) => {
            svg.append('circle')
                .attr('cx', node.x)
                .attr('cy', node.y)
                .attr('r', 12)
                .attr('fill', '#3b82f6')
                .attr('opacity', 0)
                .transition()
                .delay(index * 150)
                .duration(400)
                .attr('opacity', 0.8);

            if (node.label) {
                svg.append('text')
                    .attr('x', node.x)
                    .attr('y', node.y + 25)
                    .attr('text-anchor', 'middle')
                    .attr('fill', '#94a3b8')
                    .attr('font-size', '9px')
                    .attr('opacity', 0)
                    .text(node.label)
                    .transition()
                    .delay(index * 150 + 400)
                    .duration(300)
                    .attr('opacity', 1);
            }
        });
    }
}

function showChart(domain) {
    // Update button states
    document.querySelectorAll('#ml-dl-content .control-button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const data = performanceData[domain];
    const container = d3.select('#performance-chart');
    container.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = container.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Title
    g.append('text')
        .attr('x', width / 2)
        .attr('y', -5)
        .attr('text-anchor', 'middle')
        .attr('fill', '#f1f5f9')
        .attr('font-size', '14px')
        .attr('font-weight', '600')
        .text(data.title);

    // Scales
    const xScale = d3.scaleBand()
        .domain(['Accuracy (%)', 'Training Time (hrs)', 'Model Complexity (1-10)'])
        .range([0, width])
        .padding(0.3);

    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    // Axes
    g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .attr('fill', '#94a3b8')
        .style('font-size', '10px');

    g.append('g')
        .call(d3.axisLeft(yScale))
        .selectAll('text')
        .attr('fill', '#94a3b8')
        .style('font-size', '10px');

    // Bars
    const barWidth = xScale.bandwidth() / 2 - 5;
    
    ['Accuracy (%)', 'Training Time (hrs)', 'Model Complexity (1-10)'].forEach((metric, i) => {
        const mlValue = data.data[0][metric.includes('Accuracy') ? 'accuracy' : 
                                        metric.includes('Training') ? 'training_time' * 10 : 'complexity' * 10];
        const dlValue = data.data[1][metric.includes('Accuracy') ? 'accuracy' : 
                                        metric.includes('Training') ? 'training_time' * 10 : 'complexity' * 10];

        // ML bars
        g.append('rect')
            .attr('x', xScale(metric))
            .attr('y', height)
            .attr('width', barWidth)
            .attr('height', 0)
            .attr('fill', '#3b82f6')
            .attr('opacity', 0.8)
            .on('mouseover', function(event) {
                const tooltip = d3.select('#tooltip');
                tooltip.style('opacity', 1)
                    .html(`<strong>Machine Learning</strong><br>${metric}: ${mlValue < 10 ? mlValue / 10 : mlValue}${metric.includes('Accuracy') ? '%' : metric.includes('Training') ? ' hours' : '/10'}`)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 10) + 'px');
            })
            .on('mouseout', function() {
                d3.select('#tooltip').style('opacity', 0);
            })
            .transition()
            .delay(i * 200)
            .duration(600)
            .attr('y', yScale(mlValue))
            .attr('height', height - yScale(mlValue));

        // DL bars
        g.append('rect')
            .attr('x', xScale(metric) + barWidth + 5)
            .attr('y', height)
            .attr('width', barWidth)
            .attr('height', 0)
            .attr('fill', '#8b5cf6')
            .attr('opacity', 0.8)
            .on('mouseover', function(event) {
                const tooltip = d3.select('#tooltip');
                tooltip.style('opacity', 1)
                    .html(`<strong>Deep Learning</strong><br>${metric}: ${dlValue < 10 ? dlValue / 10 : dlValue}${metric.includes('Accuracy') ? '%' : metric.includes('Training') ? ' hours' : '/10'}`)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 10) + 'px');
            })
            .on('mouseout', function() {
                d3.select('#tooltip').style('opacity', 0);
            })
            .transition()
            .delay(i * 200 + 100)
            .duration(600)
            .attr('y', yScale(dlValue))
            .attr('height', height - yScale(dlValue));
    });
} 
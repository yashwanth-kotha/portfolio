// CNN Visualization JavaScript

// CNN Animation State
let cnnAnimationInterval;
let currentStage = 0;
const cnnStages = ['input', 'conv1', 'pool1', 'conv2', 'pool2', 'fc', 'output'];

// Interactive Image State
let imageData = Array(64).fill(0); // 8x8 grid
let currentFilter = 'edge';

// Modal functions
function openCNNModal() {
    loadCNNContent();
    document.getElementById('cnnModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        initializeInteractiveImage();
        initializeFeatureOutput();
    }, 100);
}

function closeCNNModal() {
    document.getElementById('cnnModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    resetCNN();
}

function loadCNNContent() {
    const content = document.getElementById('cnn-content');
    content.innerHTML = `
        <div class="viz-header">
            <h2>Convolutional Neural Network Architecture</h2>
            <p style="color: #94a3b8; font-size: 1.1rem;">Interactive exploration of how CNNs process and understand images</p>
        </div>

        <!-- CNN Pipeline -->
        <div style="background: rgba(51, 65, 85, 0.3); border-radius: 15px; padding: 2rem; margin: 2rem 0;">
            <h3 style="text-align: center; margin-bottom: 1.5rem; color: #f1f5f9;">CNN Processing Pipeline</h3>
            <div style="display: flex; justify-content: space-between; align-items: center; margin: 2rem 0; overflow-x: auto; padding: 1rem;" id="cnn-pipeline">
                <div class="cnn-stage active" id="stage-input">
                    <div style="width: 80px; height: 60px; margin: 0 auto 0.5rem; border-radius: 5px; background: linear-gradient(45deg, #3b82f6, #8b5cf6);"></div>
                    <h4 style="color: #f1f5f9; margin-bottom: 0.5rem; font-size: 0.9rem;">Input Image</h4>
                    <p style="font-size: 0.8rem; color: #94a3b8;">32×32×3 RGB</p>
                </div>
                <div style="color: #10b981; font-size: 1.5rem;">→</div>
                <div class="cnn-stage" id="stage-conv1">
                    <div style="width: 80px; height: 60px; margin: 0 auto 0.5rem; border-radius: 5px; background: linear-gradient(45deg, #10b981, #059669);"></div>
                    <h4 style="color: #f1f5f9; margin-bottom: 0.5rem; font-size: 0.9rem;">Conv Layer 1</h4>
                    <p style="font-size: 0.8rem; color: #94a3b8;">6 filters 5×5</p>
                </div>
                <div style="color: #10b981; font-size: 1.5rem;">→</div>
                <div class="cnn-stage" id="stage-pool1">
                    <div style="width: 80px; height: 60px; margin: 0 auto 0.5rem; border-radius: 5px; background: linear-gradient(45deg, #f59e0b, #d97706);"></div>
                    <h4 style="color: #f1f5f9; margin-bottom: 0.5rem; font-size: 0.9rem;">Max Pool 1</h4>
                    <p style="font-size: 0.8rem; color: #94a3b8;">2×2 stride 2</p>
                </div>
                <div style="color: #10b981; font-size: 1.5rem;">→</div>
                <div class="cnn-stage" id="stage-conv2">
                    <div style="width: 80px; height: 60px; margin: 0 auto 0.5rem; border-radius: 5px; background: linear-gradient(45deg, #10b981, #059669);"></div>
                    <h4 style="color: #f1f5f9; margin-bottom: 0.5rem; font-size: 0.9rem;">Conv Layer 2</h4>
                    <p style="font-size: 0.8rem; color: #94a3b8;">16 filters 5×5</p>
                </div>
                <div style="color: #10b981; font-size: 1.5rem;">→</div>
                <div class="cnn-stage" id="stage-pool2">
                    <div style="width: 80px; height: 60px; margin: 0 auto 0.5rem; border-radius: 5px; background: linear-gradient(45deg, #f59e0b, #d97706);"></div>
                    <h4 style="color: #f1f5f9; margin-bottom: 0.5rem; font-size: 0.9rem;">Max Pool 2</h4>
                    <p style="font-size: 0.8rem; color: #94a3b8;">2×2 stride 2</p>
                </div>
                <div style="color: #10b981; font-size: 1.5rem;">→</div>
                <div class="cnn-stage" id="stage-fc">
                    <div style="width: 80px; height: 60px; margin: 0 auto 0.5rem; border-radius: 5px; background: linear-gradient(45deg, #ef4444, #dc2626);"></div>
                    <h4 style="color: #f1f5f9; margin-bottom: 0.5rem; font-size: 0.9rem;">Fully Connected</h4>
                    <p style="font-size: 0.8rem; color: #94a3b8;">120 neurons</p>
                </div>
                <div style="color: #10b981; font-size: 1.5rem;">→</div>
                <div class="cnn-stage" id="stage-output">
                    <div style="width: 80px; height: 60px; margin: 0 auto 0.5rem; border-radius: 5px; background: linear-gradient(45deg, #8b5cf6, #7c3aed);"></div>
                    <h4 style="color: #f1f5f9; margin-bottom: 0.5rem; font-size: 0.9rem;">Output</h4>
                    <p style="font-size: 0.8rem; color: #94a3b8;">10 classes</p>
                </div>
            </div>
            
            <div class="controls">
                <button class="control-button active" onclick="animateCNN()">Start Animation</button>
                <button class="control-button" onclick="resetCNN()">Reset</button>
                <button class="control-button" onclick="showConvolution()">Show Convolution</button>
                <button class="control-button" onclick="showFeatureMaps()">Feature Maps</button>
            </div>
        </div>

        <!-- Interactive Image and Convolution -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
            <div style="background: rgba(51, 65, 85, 0.3); border-radius: 15px; padding: 1.5rem;">
                <h3 style="text-align: center; margin-bottom: 1rem; color: #f1f5f9;">Interactive Image</h3>
                <div style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 1px; width: 200px; height: 200px; margin: 1rem auto; border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 5px; overflow: hidden;" id="interactive-image"></div>
                <div style="text-align: center; margin-top: 1rem;">
                    <button class="control-button" onclick="drawShape('digit')">Draw Digit</button>
                    <button class="control-button" onclick="drawShape('edge')">Draw Edge</button>
                    <button class="control-button" onclick="clearImage()">Clear</button>
                </div>
            </div>
            
            <div style="background: rgba(51, 65, 85, 0.3); border-radius: 15px; padding: 1.5rem;">
                <h3 style="text-align: center; margin-bottom: 1rem; color: #f1f5f9;">Feature Map Output</h3>
                <div style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 1px; width: 200px; height: 200px; margin: 1rem auto; border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 5px; overflow: hidden;" id="feature-output"></div>
                <div style="text-align: center; margin-top: 1rem; color: #94a3b8; font-size: 0.9rem;">
                    Result after applying convolution filter
                </div>
            </div>
        </div>

        <!-- Filter Examples -->
        <div style="background: rgba(51, 65, 85, 0.3); border-radius: 15px; padding: 2rem;">
            <h3 style="text-align: center; margin-bottom: 1.5rem; color: #f1f5f9;">Common CNN Filters</h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 2rem 0;">
                <div style="background: rgba(30, 41, 59, 0.5); padding: 1rem; border-radius: 10px; text-align: center;">
                    <h4 style="color: #10b981;">Edge Detection</h4>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin: 1rem auto; width: 60px; height: 60px;">
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">-1</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">-1</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">-1</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">0</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">0</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">0</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">1</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">1</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">1</div>
                    </div>
                    <p style="font-size: 0.8rem; color: #94a3b8;">Detects horizontal edges</p>
                </div>
                
                <div style="background: rgba(30, 41, 59, 0.5); padding: 1rem; border-radius: 10px; text-align: center;">
                    <h4 style="color: #3b82f6;">Blur Filter</h4>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin: 1rem auto; width: 60px; height: 60px;">
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">1</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">1</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">1</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">1</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">1</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">1</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">1</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">1</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">1</div>
                    </div>
                    <p style="font-size: 0.8rem; color: #94a3b8;">Smooths the image</p>
                </div>
                
                <div style="background: rgba(30, 41, 59, 0.5); padding: 1rem; border-radius: 10px; text-align: center;">
                    <h4 style="color: #8b5cf6;">Sharpen Filter</h4>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin: 1rem auto; width: 60px; height: 60px;">
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">0</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">-1</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">0</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">-1</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">5</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">-1</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">0</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">-1</div>
                        <div style="background: rgba(148, 163, 184, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #e2e8f0;">0</div>
                    </div>
                    <p style="font-size: 0.8rem; color: #94a3b8;">Enhances edges</p>
                </div>
            </div>
        </div>

        <!-- Architecture Comparison -->
        <div style="background: rgba(51, 65, 85, 0.3); border-radius: 15px; padding: 2rem; margin: 2rem 0;">
            <h3 style="text-align: center; margin-bottom: 1.5rem; color: #f1f5f9;">CNN vs Traditional Neural Networks</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div style="background: rgba(30, 41, 59, 0.5); padding: 1.5rem; border-radius: 10px; border-left: 4px solid #10b981;">
                    <h4 style="color: #10b981; margin-bottom: 1rem;">CNN Advantages</h4>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                            <span style="position: absolute; left: 0; color: #10b981;">•</span>
                            Translation invariance
                        </li>
                        <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                            <span style="position: absolute; left: 0; color: #10b981;">•</span>
                            Fewer parameters than FC networks
                        </li>
                        <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                            <span style="position: absolute; left: 0; color: #10b981;">•</span>
                            Hierarchical feature learning
                        </li>
                        <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                            <span style="position: absolute; left: 0; color: #10b981;">•</span>
                            Spatial relationship preservation
                        </li>
                    </ul>
                </div>
                
                <div style="background: rgba(30, 41, 59, 0.5); padding: 1.5rem; border-radius: 10px; border-left: 4px solid #f59e0b;">
                    <h4 style="color: #f59e0b; margin-bottom: 1rem;">Key Applications</h4>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                            <span style="position: absolute; left: 0; color: #f59e0b;">•</span>
                            Image classification
                        </li>
                        <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                            <span style="position: absolute; left: 0; color: #f59e0b;">•</span>
                            Object detection
                        </li>
                        <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                            <span style="position: absolute; left: 0; color: #f59e0b;">•</span>
                            Medical image analysis
                        </li>
                        <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                            <span style="position: absolute; left: 0; color: #f59e0b;">•</span>
                            Autonomous vehicles
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// CNN Functions
function animateCNN() {
    resetCNN();
    currentStage = 0;
    
    cnnAnimationInterval = setInterval(() => {
        // Remove active class from all stages
        document.querySelectorAll('.cnn-stage').forEach(stage => {
            stage.classList.remove('active');
        });
        
        // Add active class to current stage
        if (currentStage < cnnStages.length) {
            const stageElement = document.getElementById(`stage-${cnnStages[currentStage]}`);
            if (stageElement) {
                stageElement.classList.add('active');
            }
            currentStage++;
        } else {
            clearInterval(cnnAnimationInterval);
        }
    }, 1000);
}

function resetCNN() {
    if (cnnAnimationInterval) {
        clearInterval(cnnAnimationInterval);
    }
    currentStage = 0;
    
    document.querySelectorAll('.cnn-stage').forEach(stage => {
        stage.classList.remove('active');
    });
    const inputStage = document.getElementById('stage-input');
    if (inputStage) {
        inputStage.classList.add('active');
    }
}

function showConvolution() {
    // Highlight convolution stages
    document.querySelectorAll('.cnn-stage').forEach(stage => {
        stage.classList.remove('active');
    });
    const conv1 = document.getElementById('stage-conv1');
    const conv2 = document.getElementById('stage-conv2');
    if (conv1) conv1.classList.add('active');
    if (conv2) conv2.classList.add('active');
}

function showFeatureMaps() {
    // Update feature output based on current image
    updateFeatureOutput();
}

function initializeInteractiveImage() {
    const container = document.getElementById('interactive-image');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < 64; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.style.background = '#1e293b';
        pixel.style.transition = 'background-color 0.3s';
        pixel.dataset.index = i;
        
        pixel.addEventListener('click', () => {
            togglePixel(i);
        });
        
        pixel.addEventListener('mouseover', (e) => {
            if (e.buttons === 1) { // If mouse is pressed
                togglePixel(i);
            }
        });
        
        container.appendChild(pixel);
    }
}

function initializeFeatureOutput() {
    const container = document.getElementById('feature-output');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < 64; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.style.background = '#1e293b';
        pixel.style.transition = 'background-color 0.3s';
        container.appendChild(pixel);
    }
}

function togglePixel(index) {
    imageData[index] = imageData[index] ? 0 : 1;
    updateImageDisplay();
    updateFeatureOutput();
}

function updateImageDisplay() {
    const pixels = document.querySelectorAll('#interactive-image .pixel');
    pixels.forEach((pixel, index) => {
        const intensity = imageData[index];
        pixel.style.background = intensity ? `rgb(${100 + intensity * 155}, ${100 + intensity * 155}, ${255})` : '#1e293b';
    });
}

function updateFeatureOutput() {
    const pixels = document.querySelectorAll('#feature-output .pixel');
    if (!pixels.length) return;
    
    // Simple edge detection simulation
    const edgeFilter = [-1, -1, -1, 0, 0, 0, 1, 1, 1];
    const outputData = Array(64).fill(0);
    
    for (let row = 1; row < 7; row++) {
        for (let col = 1; col < 7; col++) {
            let sum = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const idx = (row + i) * 8 + (col + j);
                    const filterIdx = (i + 1) * 3 + (j + 1);
                    sum += imageData[idx] * edgeFilter[filterIdx];
                }
            }
            outputData[row * 8 + col] = Math.max(0, Math.min(1, Math.abs(sum) / 3));
        }
    }
    
    pixels.forEach((pixel, index) => {
        const intensity = outputData[index];
        pixel.style.background = intensity > 0.1 ? `rgb(${intensity * 255}, ${intensity * 100}, ${intensity * 255})` : '#1e293b';
    });
}

function drawShape(shape) {
    imageData.fill(0);
    
    if (shape === 'digit') {
        // Draw a simple "7" pattern
        const pattern = [
            0,1,1,1,1,1,1,0,
            0,0,0,0,0,0,1,0,
            0,0,0,0,0,1,0,0,
            0,0,0,0,1,0,0,0,
            0,0,0,1,0,0,0,0,
            0,0,1,0,0,0,0,0,
            0,1,0,0,0,0,0,0,
            1,0,0,0,0,0,0,0
        ];
        imageData = [...pattern];
    } else if (shape === 'edge') {
        // Draw a vertical edge
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 4; col++) {
                imageData[row * 8 + col] = 1;
            }
        }
    }
    
    updateImageDisplay();
    updateFeatureOutput();
}

function clearImage() {
    imageData.fill(0);
    updateImageDisplay();
    updateFeatureOutput();
}

// Add CSS for CNN stages
const cnnStyles = `
.cnn-stage {
    background: rgba(51, 65, 85, 0.3);
    border-radius: 10px;
    padding: 1rem;
    margin: 0 0.5rem;
    min-width: 120px;
    text-align: center;
    border: 2px solid transparent;
    transition: all 0.3s;
}

.cnn-stage.active {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.1);
}
`;

// Inject CNN styles
if (!document.getElementById('cnn-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'cnn-styles';
    styleSheet.textContent = cnnStyles;
    document.head.appendChild(styleSheet);
}
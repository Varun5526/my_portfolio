// Lightning and Thunder Effect System
(function() {
    'use strict';
    
    // Configuration
    const config = {
        minInterval: 2000,  // Minimum time between lightning strikes (ms)
        maxInterval: 5000,  // Maximum time between lightning strikes (ms)
        flashDuration: 300, // Duration of flash effect (ms)
        boltDuration: 300,  // Duration of lightning bolt (ms)
        multiStrike: true,  // Enable multiple simultaneous strikes
        continuousMode: true // Keep effects running continuously
    };
    
    // Create container elements
    function createLightningContainer() {
        const container = document.createElement('div');
        container.className = 'lightning-container';
        container.id = 'lightning-container';
        document.body.appendChild(container);
        return container;
    }
    
    // Create lightning bolt element
    function createLightningBolt(x, height) {
        const bolt = document.createElement('div');
        bolt.className = 'lightning-bolt';
        bolt.style.left = x + 'px';
        bolt.style.height = height + 'px';
        bolt.style.top = '0';
        
        // Random slight angle for more natural look
        const angle = (Math.random() - 0.5) * 10;
        bolt.style.transform = `rotate(${angle}deg)`;
        
        return bolt;
    }
    
    // Create thunder flash overlay
    function createThunderFlash() {
        const flash = document.createElement('div');
        flash.className = 'thunder-flash';
        return flash;
    }
    
    // Create lightning glow effect
    function createLightningGlow() {
        const glow = document.createElement('div');
        glow.className = 'lightning-glow';
        return glow;
    }
    
    // Trigger lightning strike
    function triggerLightning() {
        const container = document.getElementById('lightning-container');
        if (!container) return;
        
        // Number of simultaneous strikes (1-3)
        const numStrikes = config.multiStrike ? Math.floor(Math.random() * 2) + 1 : 1;
        
        for (let i = 0; i < numStrikes; i++) {
            setTimeout(() => {
                // Random position for lightning
                const x = Math.random() * window.innerWidth;
                const height = window.innerHeight * (0.3 + Math.random() * 0.7);
                
                // Create and add lightning bolt
                const bolt = createLightningBolt(x, height);
                container.appendChild(bolt);
                
                // Create and add thunder flash
                const flash = createThunderFlash();
                document.body.appendChild(flash);
                
                // Create and add glow effect
                const glow = createLightningGlow();
                document.body.appendChild(glow);
                
                // Add screen shake effect
                document.body.style.animation = 'screen-shake 0.15s ease-in-out';
                
                // Remove elements after animation
                setTimeout(() => {
                    if (container.contains(bolt)) container.removeChild(bolt);
                    if (document.body.contains(flash)) document.body.removeChild(flash);
                    if (document.body.contains(glow)) document.body.removeChild(glow);
                    document.body.style.animation = '';
                }, config.boltDuration);
            }, i * 100); // Slight delay between multiple strikes
        }
        
        // Always schedule next lightning for continuous effect
        scheduleNextLightning();
    }
    
    // Schedule next lightning strike
    function scheduleNextLightning() {
        const delay = config.minInterval + 
                     Math.random() * (config.maxInterval - config.minInterval);
        setTimeout(triggerLightning, delay);
    }
    
    // Initialize
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        // Create container
        createLightningContainer();
        
        // Add screen shake animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes screen-shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-2px); }
                75% { transform: translateX(2px); }
            }
        `;
        document.head.appendChild(style);
        
        // Start lightning effects immediately and continuously
        setTimeout(() => {
            triggerLightning();
        }, 1000);
        
        // Add visibility change listener to restart effects
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && config.continuousMode) {
                scheduleNextLightning();
            }
        });
        
        // Restart on window focus
        window.addEventListener('focus', () => {
            if (config.continuousMode) {
                setTimeout(triggerLightning, 500);
            }
        });
    }
    
    // Start the system
    init();
})();

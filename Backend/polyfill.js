// Polyfill for SlowBuffer in Node.js v21+
// This fixes the buffer-equal-constant-time compatibility issue

if (!Buffer.SlowBuffer) {
    Buffer.SlowBuffer = function SlowBuffer(size) {
        return Buffer.allocUnsafe(size);
    };
    
    Buffer.SlowBuffer.prototype = Object.create(Buffer.prototype);
    
    // Add methods that buffer-equal-constant-time expects
    Buffer.SlowBuffer.prototype.equal = function(other) {
        if (!Buffer.isBuffer(other)) {
            return false;
        }
        if (this.length !== other.length) {
            return false;
        }
        return this.compare(other) === 0;
    };
}

console.log('✅ SlowBuffer polyfill loaded for Node.js v25 compatibility');

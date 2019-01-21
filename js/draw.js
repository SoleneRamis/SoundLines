class Draw {
    constructor(opts = {}) {
        this.position = []
        this.ctx = opts.ctx
        this.freq = 0.00015
        this.colors = ['white', '#99C5B5', '#AFECE7', '#81F499']
    }

    update() {
    }
    
    draw(ctx) {
        if (navigator.platform != "iPad" && navigator.platform != "iPhone" && navigator.platform != "iPod") {
            canvas.width = window.outerWidth;
            //I'll use window.innerWidth in production
        } else {
            canvas.width = screen.width;
        }
        // alert("draw")
        ctx.save()
        ctx.beginPath()
        for (var i = 1; i < 6; i++) {
            ctx.beginPath()
            for (var x = 0; x < canvas.width; x++) {
                if (average < 10) {
                        average = 1
                    }
                var y = Math.sin(x * average * (freq * 0.0000025) * (i / 3) + (cumul * 0.0005)) * (average * 2.5)
                ctx.lineTo(x, y + canvas.height / 2)
            }
            ctx.globalAlpha = i / 10 
            ctx.strokeStyle = this.colors[i%2]
            ctx.lineWidth = 3
            ctx.stroke()
        }
        ctx.restore()

    }
} 

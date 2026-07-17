/**
 * CodeDeb Vehicle/Fleet Management System - Interactive CCTV Canvas Renderer
 */

function startCCTVLoop(canvasId, cameraName, vehicleData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    function drawVectorGrid() {
        ctx.fillStyle = "#090d16";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid background lines
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 20) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 20) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Camera feed horizontal scanning bar lines
        ctx.strokeStyle = "rgba(16, 185, 129, 0.04)";
        ctx.lineWidth = 2;
        for (let y = 0; y < canvas.height; y += 6) {
            ctx.beginPath();
            ctx.moveTo(0, y + (Math.sin(Date.now() / 150) * 4));
            ctx.lineTo(canvas.width, y + (Math.sin(Date.now() / 150) * 4));
            ctx.stroke();
        }

        // Camera interface overlay text data
        ctx.fillStyle = "#10b981";
        ctx.font = "bold 9px monospace";
        ctx.fillText(`CAM: ${cameraName.toUpperCase()}`, 15, 20);
        ctx.fillText(`UNIT: ${vehicleData.id} (${vehicleData.regNo})`, 15, 32);
        ctx.fillText(`BATT: ${vehicleData.battery}% | SPEED: ${vehicleData.speed} KM/H`, 15, 44);

        const now = new Date();
        ctx.fillText(`DATE: 2026/07/17`, canvas.width - 130, 20);
        ctx.fillText(`TIME: ${now.toLocaleTimeString()}`, canvas.width - 130, 32);

        // Vector graphics representing specific channels
        ctx.strokeStyle = "rgba(16, 185, 129, 0.25)";
        ctx.lineWidth = 1.5;

        if (cameraName.includes("Cabin")) {
            // Draw passenger aisle perspective
            ctx.beginPath();
            ctx.moveTo(120, 60); ctx.lineTo(60, 180);
            ctx.moveTo(240, 60); ctx.lineTo(300, 180);
            ctx.stroke();

            // Seat silhouettes
            ctx.strokeRect(65, 80, 20, 15);
            ctx.strokeRect(235, 80, 20, 15);
            ctx.strokeRect(55, 110, 25, 20);
            ctx.strokeRect(240, 110, 25, 20);
        } else if (cameraName.includes("Driver")) {
            // Draw driving steering wheel perspective
            ctx.beginPath();
            ctx.arc(180, 120, 35, 0, Math.PI * 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(180, 120); ctx.lineTo(180, 155);
            ctx.moveTo(180, 120); ctx.lineTo(145, 120);
            ctx.moveTo(180, 120); ctx.lineTo(215, 120);
            ctx.stroke();
        } else {
            // Front road highway perspective
            ctx.beginPath();
            ctx.moveTo(180, 60); ctx.lineTo(40, 180);
            ctx.moveTo(180, 60); ctx.lineTo(320, 180);
            ctx.stroke();

            // Road divider dashed lines
            ctx.setLineDash([8, 12]);
            ctx.beginPath();
            ctx.moveTo(180, 60); ctx.lineTo(180, 180);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        animationFrameId = requestAnimationFrame(drawVectorGrid);
    }

    drawVectorGrid();
    return () => cancelAnimationFrame(animationFrameId);
}
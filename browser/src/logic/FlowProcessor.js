import Shot from '../game-objects/Shot.js';

// This is a static class (or a collection of functions)
export default class FlowProcessor {

    // Main entry point, called from Character.update()
    static processFlows(character, time, delta) {
        character.flowData.forEach(flow => {
            // MVP: For now, let's ignore conditions and just run the first flow
            if (!flow.hasStarted) {
                this.startFlow(character, flow);
                flow.hasStarted = true;
            }

            if (flow.isExecuting) {
                this.executeCommand(character, flow, time, delta);
            }
        });
    }

    static startFlow(character, flow) {
        flow.isExecuting = true;
        flow.currentCommandIndex = 0;
        flow.commandTimer = 0;
    }

    static executeCommand(character, flow, time, delta) {
        const command = flow.commandData[flow.currentCommandIndex];
        flow.commandTimer += delta;

        // Command logic here
        switch (command.type) {
            case 2: { // Linear Movement
                // Simplification for MVP: move left
                character.body.setVelocityX(-command.details.time_speed_distance_speed);
                break;
            }
            case 11: { // Shot
                // Create a shot instance and add it to the scene
                const shot = new Shot(character.scene, character.x, character.y, 'shot_spritesheet', command.details);
                character.scene.add.existing(shot);
                character.scene.physics.add.existing(shot);
                shot.body.setVelocityX(300); // Use details from command
                break;
            }
        }

        // Check if command is finished (based on its execution_time)
        if (flow.commandTimer >= command.details.execution_time * (1000 / 60)) { // Convert frames to ms
            flow.currentCommandIndex++;
            flow.commandTimer = 0;
            if (flow.currentCommandIndex >= flow.commandData.length) {
                // For looping flows, reset index. For one-shot flows, stop.
                flow.currentCommandIndex = 0; // Simple loop for MVP
            }
        }
    }
}
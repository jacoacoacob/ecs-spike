import { createApp } from "./src/lib/app.js";
import { createSprite, createTile } from "./src/entities.js";
import { selectByCoords } from "./src/selectors.js";

const app = createApp();

app.addSystem((entities) => {
    console.log(entities);
});

app.addEntity(createSprite(50, 30, 20));
app.addEntity(createSprite(600, 440, 30));
app.addEntity(createTile());
app.addEntity(createTile());
app.addEntity(createTile());
app.addEntity(createTile());
app.addEntity(createTile());

console.log(app.query(selectByCoords(60, 40)))

class Example extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("pic", "assets/pics/a-new-link-to-the-past-by-ptimm.jpg");
    this.load.image("logo", "assets/sprites/phaser3-logo.png");
  }

  create() {
    this.add.image(400, 300, "pic");
    const logo = this.add.image(400, 200, "logo").setVisible(false);

    //  Let's show the logo when the camera flashes, and hide it when it completes
    this.cameras.main.on("cameraflashstart", function (cam, fx, duration) {
      logo.setVisible(true);
    });

    this.cameras.main.on("cameraflashcomplete", function () {
      logo.setVisible(false);
    });

    //  Every time you click, shake the camera
    this.input.on(
      "pointerdown",
      function () {
        this.cameras.main.flash();
      },
      this,
    );
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: Example,
};

const game = new Phaser.Game(config);

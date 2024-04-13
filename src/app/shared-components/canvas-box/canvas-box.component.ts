import { Component, HostListener, OnInit } from '@angular/core';
import * as THREE from 'three';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


@Component({
  selector: 'app-canvas-box',
  standalone: true,
  imports: [],
  templateUrl: './canvas-box.component.html',
  styleUrl: './canvas-box.component.scss'
})
export class CanvasBoxComponent implements OnInit {

  getScreenWidth: number = 0;
  getScreenHeight: number = 0;
  exWidth: number = 1;
  renderer: any;
  canvas: HTMLCanvasElement | undefined;
  object: any;
  scene: any;
  camera: any;
  exCameraDistance = 0
  ngOnInit(): void {
    this.getScreenWidth = 800;
    this.getScreenHeight = window.innerHeight;
    this.exWidth = this.getScreenWidth;
    this.exCameraDistance = this.getScreenWidth / 30

    this.scene = new THREE.Scene();
    this.canvas = document.getElementById('canvas-box') as HTMLCanvasElement;
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.getScreenWidth / this.getScreenHeight,
      0.1,
      1000
    );

    /*     this.camera = new THREE.OrthographicCamera(
          this.getScreenWidth / -50,
          this.getScreenWidth / 50,
          this.getScreenHeight / 50,
          this.getScreenHeight / -50,
          1, 1000
        ) */


    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });

    this.createThreeBox();
  }

  createThreeBox() {


    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const diff = 1 - 1000 / this.getScreenWidth

    this.camera.position.z = /* this.exCameraDistance - this.exCameraDistance * diff */30;
    this.camera.position.x = 15;
    this.camera.position.y = 5;
    this.scene.add(this.camera);


    if (!this.canvas) {
      return;
    }
    this.renderer.setSize(this.getScreenWidth, this.getScreenHeight);
    const mtlLoader = new MTLLoader();
    mtlLoader.load('../../../assets/baloon/Air_Balloon.mtl', (materials) => {
      materials.preload();


      const objloader = new OBJLoader();
      objloader.setMaterials(materials);
      objloader.load('../../../assets/baloon/Air_Balloon.obj', (obj) => {

        this.object = obj

        obj.position.y = -20;


        this.scene.add(obj);
        console.log("Object is loaded");

        this.renderer.domElement = this.canvas
        this.renderer.setClearColor(0xe232222, 0);
        const controls = new OrbitControls(this.camera, this.renderer.domElement);


        controls.enableRotate = true;
        controls.enableZoom = false;
        //controls.enableRotateVertical = false;



        const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.7);
        directionalLight.target = obj
        directionalLight.position.set(0, 10, 20);

        this.scene.add(directionalLight);
        const directionalLight2 = new THREE.DirectionalLight(0xffff00, 1);
        directionalLight2.position.set(-15, -5, -5);

        this.scene.add(directionalLight2);
        const directionalLight3 = new THREE.DirectionalLight(0xff0000, 1);
        directionalLight3.position.set(15, -15, -15);

        this.scene.add(directionalLight3);



        const animate = () => {
          requestAnimationFrame(animate);
          // controls.update();
          obj.rotation.y += 0.001;
          this.renderer.render(this.scene, this.camera);
        }

        animate(); // Start the animation loop
      });


    })


  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {

    this.getScreenWidth = window.innerWidth / 2.5;
    this.getScreenHeight = window.innerHeight;

    const diff = 1 - this.exWidth / (this.getScreenWidth)

    console.log("diff", diff);

    const cameraDistance = this.exCameraDistance - this.exCameraDistance * diff

    this.exWidth = this.getScreenWidth;

    this.camera.position.z = cameraDistance;

    this.exCameraDistance = cameraDistance


    this.camera.updateProjectionMatrix()

    console.log("resizing ->", this.camera.position.z);
  }

}

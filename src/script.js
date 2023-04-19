import * as THREE from 'three'
// THREE.JS Class
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
// Control pannel LIL-GUI
import * as dat from 'lil-gui'


/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures loader
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Fonts loader
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Hello Three.Js',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        //textGeometry.computeBoundingBox()
        //console.log(textGeometry.boundingBox)

        //textGeometry.translate(
        //    - (textGeometry.boundingBox.max.x - 0.02) * 0.5, // substract bevel size
        //    - (textGeometry.boundingBox.max.y - 0.02) * 0.5, // substract bevel size
        //    - (textGeometry.boundingBox.max.z - 0.03) * 0.5  // substract bevel thickness
        //)

        textGeometry.center()

        const material = new THREE.MeshMatcapMaterial({matcap: matcapTextureArray[Math.floor(Math.random() * matcapTextureArray.length)]})
        const text = new THREE.Mesh(textGeometry, material)

        // Donut creation
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)

        for(let i = 0; i < 200; i++) {
            const donut = new THREE.Mesh(donutGeometry, material)
            // Make donut random position, otherwise they will be all into the same place
            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10
            // Make donut random rotation
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            // Make random scale
            const scale = Math.random()
            donut.scale.set(scale, scale, scale)

            // Add donuts to the scene
            scene.add(donut)
        }
        scene.add(text)

        // LIL-GUI
        gui.add(material, 'visible')
        
        // Create a variable to store the index of the selected matcap
        let matcapIndex = 0

       // Create a dropdown list control for the matcap
       const matcapControl = gui.add({ Matcap: matcapIndex }, 'Matcap', 0, matcapTextureArray.length - 1).step(1)
       matcapControl.onChange(() => {
       matcapIndex = matcapControl.getValue()
       material.matcap = matcapTextureArray[matcapIndex]
         })
       })

    


// ADD A MAPCAP MATERIAL
const matcapTexture1 = textureLoader.load('/textures/matcaps/1.png')
const matcapTexture2 = textureLoader.load('/textures/matcaps/2.png')
const matcapTexture3 = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture4 = textureLoader.load('/textures/matcaps/4.png')
const matcapTexture5 = textureLoader.load('/textures/matcaps/5.png')
const matcapTexture6 = textureLoader.load('/textures/matcaps/6.png')
const matcapTexture7 = textureLoader.load('/textures/matcaps/7.png')
const matcapTexture8 = textureLoader.load('/textures/matcaps/8.png') 

const matcapTextureArray = [
    matcapTexture1,
    matcapTexture2,
    matcapTexture3,
    matcapTexture4,
    matcapTexture5,
    matcapTexture6,
    matcapTexture7,
    matcapTexture8
]


/**
 * Object
 */
//const cube = new THREE.Mesh(
//    new THREE.BoxGeometry(1, 1, 1),
//    new THREE.MeshBasicMaterial()
//)
//scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()



const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

        // Rotate each donut mesh
        scene.children.forEach(child => {
            if (child instanceof THREE.Mesh && child.geometry instanceof THREE.TorusGeometry) {
                child.rotation.x += 0.01
                child.rotation.y += 0.01
                child.rotation.z += 0.01
            }
        })

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
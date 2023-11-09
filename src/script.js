import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
//import GUI from 'lil-gui'

/**
 * Base
 */
//const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()




/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/textures/matcaps/3.png')
const cubeTexture = textureLoader.load('/textures/matcaps/3.png')

/**
 * Fonts
 */


const fontLoader = new FontLoader()
fontLoader.load(
    "/fonts/helvetiker_regular.typeface.json",
    (font) => {
        const textGeometry = new TextGeometry(
            'I\'m Jugurtha Gaci',
            {
                font,
                size: 0.5,
                height: 0.2,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 3
            }
        )

        textGeometry.center()

        // textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     -(textGeometry.boundingBox.max.x - 0.02) / 2,
        //     -(textGeometry.boundingBox.max.y - 0.02) / 2,
        //     -(textGeometry.boundingBox.max.z - 0.03) / 2

        // )
        // console.log(textGeometry.boundingBox)

        const textMaterial = new THREE.MeshMatcapMaterial({
            matcap: texture
        })
        const text = new THREE.Mesh(textGeometry, textMaterial)
        
       

        scene.add(text)


        const boxGeometry =  new THREE.OctahedronGeometry(0.1)
        
        const donutMaterial = new THREE.MeshMatcapMaterial({matcap: cubeTexture})

        for(let i = 0; i < 800; i++)
        {
            const donut = new THREE.Mesh(boxGeometry, donutMaterial)

            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10
            
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            
            const scale = Math.random()
            donut.scale.set(scale, scale, scale)


            scene.add(donut)


        }

    }
)




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
camera.position.z = 4.5



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

  
    

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}


tick()

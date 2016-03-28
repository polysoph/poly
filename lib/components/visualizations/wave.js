
const {
	Scene,
	BoxGeometry,
	PerspectiveCamera,
	Mesh,
	MeshBasicMaterial,
	Color,
	Particle,
	ParticleCanvasMaterial,
	CanvasRenderer
} = THREE

const RATE = 1 / 50

const SEPARATION = 100
const AMOUNT_X = 50
const AMOUNT_Y = 50

const ANGLE_X = 400
const ANGLE_Y = 350

const TWO_PI = Math.PI * 2

export default function (el) {

	let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
	let scene = new Scene()
	let particles = []
	let particle
	let count = 0

	let mouse = {
		x: 0,
		y: 0
	}

	let material = new ParticleCanvasMaterial({
		color: new Color(0xf2f2f2),
		program (context) {
			context.beginPath()
			context.arc(0, 0, 1, 0, TWO_PI, true)
			context.fill()
		}
	})

	let width
	let height
	let halfWidth
	let halfHeight
	let tickRequest

	camera.position.z = 1500

	let i = 0
	for (let x = 0; x < AMOUNT_X; x++) {
		for (let y = 0; y < AMOUNT_Y; y++) {
			particle = particles[i++] = new Particle(material)
			particle.position.x = x * SEPARATION - ((AMOUNT_X * SEPARATION) / 2)
			particle.position.z = y * SEPARATION - ((AMOUNT_Y * SEPARATION) / 2)
			scene.add(particle)
		}
	}

	let renderer = new CanvasRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)
	el.appendChild(renderer.domElement)

	window.addEventListener('resize', resize, false)
	resize()
	tick()

	function resize () {
		width = el.offsetWidth
		height = el.offsetHeight
		halfWidth = width / 2
		halfHeight = height / 2
		camera.aspect = width / height
		camera.updateProjectionMatrix()
		renderer.setSize(width, height)
		camera.position.x = ANGLE_X
		camera.position.y = ANGLE_Y
		camera.lookAt(scene.position)
	}

	function tick () {
		tickRequest = requestAnimationFrame(tick)
		render()
	}

	function render () {
		let i = 0
		for (let x = 0; x < AMOUNT_X; x++) {
			for (let y = 0; y < AMOUNT_Y; y++) {
				particle = particles[i++]
				particle.position.y = (Math.sin((x + count) * 0.3) * 50) + (Math.sin((y + count) * 0.5) * 50)
				particle.scale.x = particle.scale.y = (Math.sin((x + count) * 0.3) + 1) * 2 + (Math.sin((y + count) * 0.5) + 1) * 2
			}
		}

		renderer.render(scene, camera)
		count += RATE
	}

	return {
		destroy () {
			cancelAnimationFrame(tickRequest)
			window.removeEventListener('resize', resize)
		}
	}

}

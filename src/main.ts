import './style.css'
import { elementsInstances } from './shapes/elementsInstances'
import { geometryShaders } from './shapes/geometryShaders'
import { particles } from './shapes/particles.js'
import { templateScene } from './shapes/templateScene'
import { torus } from './shapes/torus'
import { attractorParticles } from './shapes/attractorsParticles.js'

attractorParticles()
particles()
elementsInstances()
geometryShaders()
templateScene()
torus()
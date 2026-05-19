import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import './index.css'
import App from './App.tsx'

gsap.registerPlugin(Flip, Draggable, ScrollTrigger, TextPlugin);

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

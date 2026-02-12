---
theme: default
background: https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Testing Frontend Code Generation with Claude & React
drawings:
  persist: false
transition: slide-left
title: Frontend Code Generation Test - Claude & React
mdc: true
---

# Frontend Code Generation Test

## Using Claude Sonnet 4.5 with React

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next slide <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/Akrem-Alamine/FrontEnd-Challange-Talan" target="_blank" alt="GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---
layout: default
---

# The Task

<div class="text-xl mt-8">

**Objective:** Test Claude Sonnet 4.5's ability to generate a complete React frontend application

</div>

<div class="mt-8 grid grid-cols-2 gap-8">

<div>

### Technology Stack
- **React 18 + TypeScript**
- **Vite** (build tool)
- **React Router** (navigation)
- **Context API** (state)
- **CSS Modules** (styling)

</div>

<div>

### Generated Application
- E-commerce frontend
- Product listing & detail pages
- Shopping cart with persistence
- 3-step checkout flow
- Responsive design
- **68 files, ~2,800 lines of code**

</div>

</div>

---
layout: default
---

# Evaluation Metrics

<div class="text-lg mt-4">

We chose **5 metrics** to evaluate the generated code:

</div>

<div class="mt-8 space-y-6">

<div v-click="1" class="flex items-center gap-4">
<div class="text-3xl font-bold text-blue-400 w-12">30%</div>
<div>
<strong>Code Completeness</strong> - All features working, no placeholders
</div>
</div>

<div v-click="2" class="flex items-center gap-4">
<div class="text-3xl font-bold text-blue-400 w-12">25%</div>
<div>
<strong>Code Quality</strong> - TypeScript, clean architecture, best practices
</div>
</div>

<div v-click="3" class="flex items-center gap-4">
<div class="text-3xl font-bold text-blue-400 w-12">20%</div>
<div>
<strong>Feature Richness</strong> - Advanced features like search, filters, validation
</div>
</div>

<div v-click="4" class="flex items-center gap-4">
<div class="text-3xl font-bold text-blue-400 w-12">15%</div>
<div>
<strong>User Experience</strong> - Design quality, responsiveness, interactions
</div>
</div>

<div v-click="5" class="flex items-center gap-4">
<div class="text-3xl font-bold text-blue-400 w-12">10%</div>
<div>
<strong>Documentation</strong> - README, setup guides, code comments
</div>
</div>

</div>

---
layout: center
class: text-center
---

# Results

<div class="text-6xl font-bold text-green-400 mt-12">
96.5 / 100
</div>

<div class="mt-8 text-2xl">
Claude Sonnet 4.5 successfully generated a production-ready React application
</div>

<div class="mt-12 grid grid-cols-5 gap-4 text-sm">

<div>
<div class="text-2xl font-bold">30/30</div>
<div class="opacity-70">Completeness</div>
</div>

<div>
<div class="text-2xl font-bold">25/25</div>
<div class="opacity-70">Quality</div>
</div>

<div>
<div class="text-2xl font-bold">19/20</div>
<div class="opacity-70">Features</div>
</div>

<div>
<div class="text-2xl font-bold">14.5/15</div>
<div class="opacity-70">UX</div>
</div>

<div>
<div class="text-2xl font-bold">8/10</div>
<div class="opacity-70">Docs</div>
</div>

</div>

<div class="mt-12">
<a href="https://github.com/Akrem-Alamine/FrontEnd-Challange-Talan" target="_blank" class="text-lg">
  View Project on GitHub →
</a>
</div>

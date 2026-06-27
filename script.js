document.body.classList.add("js-enabled");

const projects = {
  one: {
    type: "短片视觉语言 / 情绪节奏",
    title: "One and Only 视觉叙事短片",
    desc: "以篮球训练为主要内容，通过黑白到彩色的画面变化、音乐节奏和镜头组织，展示短片视觉审美与情绪推进能力。",
    layout: "singleVideo",
    video: {
      src: "assets/videos/one-and-only.mp4",
      poster: "assets/images/one-and-only-cover.jpg"
    }
  },

  sports: {
    type: "信息流广告 / 运动产品",
    title: "运动品牌短视频广告素材",
    desc: "以运动产品信息流广告为方向，展示竖屏短视频制作、实拍素材剪辑、AI 生成素材融合、字幕包装与广告结构意识。",
    layout: "videoAnalysis",
    video: {
      src: "assets/videos/sports-ad-version-b.mp4",
      poster: "assets/images/sports-ad-version-b-cover.jpg"
    },
    analysis: [
      {
        title: "定位",
        text: "适合作为 TikTok / Reels 原生信息流广告素材，重点展示运动产品在日常训练场景中的使用感。"
      },
      {
        title: "0–3s 视觉钩子",
        text: "用动作场景或训练后的痛点切入，让用户快速理解运动后的真实使用场景。"
      },
      {
        title: "场景建立",
        text: "通过实拍运动、穿着、收纳等镜头，把产品放进真实生活环境，降低广告感。"
      },
      {
        title: "卖点表达",
        text: "围绕省事、便携、训练后处理简单等卖点组织字幕和画面。"
      }
    ],
    tags: ["9:16 竖屏", "实拍素材", "AI 辅助", "字幕包装", "信息流广告"]
  },

  ai: {
    type: "AI Workflow / 素材生产流程",
    title: "AI 素材生成工作流",
    desc: "围绕信息流广告素材制作，将脚本生成、分镜拆解、提示词设计和素材库整理串成一条可复用的工作流。",
    layout: "workflow",
    flowchart: "assets/images/ai-workflow-flowchart.png",
    steps: [
      {
        title: "脚本 Agent",
        text: "根据产品卖点、用户痛点和投放场景，快速生成多个信息流广告脚本版本。"
      },
      {
        title: "分镜 Agent",
        text: "将脚本拆成镜头、字幕、素材类型与时长，方便直接进入拍摄或 AI 生成。"
      },
      {
        title: "提示词示例",
        text: "依据分镜整理可灵 / AI 视频提示词，统一产品细节、场景和镜头要求。"
      },
      {
        title: "素材库整理",
        text: "按 Hook、PainPoint、Product、Scene、Benefit、Proof、CTA 分类归档，便于后续复用和迭代。"
      }
    ]
  },

  rumble: {
    type: "创意广告短片 / 实拍 + AI",
    title: "《谁在轰隆隆》创意广告拍摄",
    desc: "围绕主角寻找怪声来源的黑色幽默创意，展示实拍调度、声音设计、分镜执行和 AI 辅助画面生成能力。",
    layout: "singleVideo",
    video: {
      src: "assets/videos/rumble-ad.mp4",
      poster: "assets/images/rumble-cover.jpg"
    }
  }
};

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 40, 260)}ms`;
  observer.observe(item);
});

const cards = document.querySelectorAll(".work-card");
const modal = document.getElementById("projectModal");
const modalType = document.getElementById("modalType");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalVideoWrap = document.getElementById("modalVideoWrap");
const modalClose = document.querySelector(".modal-close");
const modalBackdrop = document.querySelector(".modal-backdrop");

function renderSingleVideo(data) {
  return `
    <div class="modal-single-video-wrap">
      <video class="modal-video modal-main-video" controls playsinline preload="metadata" poster="${data.video.poster}">
        <source src="${data.video.src}" type="video/mp4" />
        你的浏览器不支持视频播放。
      </video>
    </div>
  `;
}

function renderVideoAnalysis(data) {
  return `
    <div class="sports-analysis-layout">
      <div class="modal-video-item vertical sports-video-left no-caption">
        <video class="modal-video" controls playsinline preload="metadata" poster="${data.video.poster}">
          <source src="${data.video.src}" type="video/mp4" />
          你的浏览器不支持视频播放。
        </video>
      </div>

      <div class="analysis-panel">
        <div class="analysis-header">
          <p class="eyebrow">Creative Structure</p>
          <h3>视频结构解析</h3>
          <p>保留更适合作品集展示的场景情绪版，作为信息流广告素材的结构案例。</p>
        </div>

        <div class="analysis-chip-row">
          ${data.tags.map(tag => `<span>${tag}</span>`).join("")}
        </div>

        <div class="analysis-list">
          ${data.analysis.map(item => `
            <section>
              <h4>${item.title}</h4>
              <p>${item.text}</p>
            </section>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderWorkflow(data) {
  return `
    <div class="workflow-panel">
      <div class="workflow-intro">
        <p class="eyebrow">AI Production Pipeline</p>
        <h3>从创意到素材库的生产流程</h3>
      </div>

      <figure class="workflow-figure">
        <img src="${data.flowchart}" alt="AI 素材生成工作流流程图" />
        <figcaption>脚本生成 → 分镜拆解 → 提示词设计 → 素材分类沉淀</figcaption>
      </figure>
    </div>
  `;
}

function openModal(key) {
  const data = projects[key];
  if (!data) return;

  modalType.textContent = data.type;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.desc;

  if (data.layout === "singleVideo") {
    modalVideoWrap.innerHTML = renderSingleVideo(data);
  } else if (data.layout === "videoAnalysis") {
    modalVideoWrap.innerHTML = renderVideoAnalysis(data);
  } else if (data.layout === "workflow") {
    modalVideoWrap.innerHTML = renderWorkflow(data);
  } else {
    modalVideoWrap.innerHTML = "";
  }

  modalVideoWrap.hidden = false;
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  modalVideoWrap.querySelectorAll("video").forEach((video) => {
    video.pause();
    video.currentTime = 0;
  });
}

cards.forEach((card) => {
  card.addEventListener("click", () => openModal(card.dataset.project));
});

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("active"));
});

document.querySelectorAll(".work-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -4;
    const rotateY = ((x / rect.width) - 0.5) * 4;
    card.style.transform = `translateY(-8px) scale(1.01) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});


// Apple-style motion enhancement init
window.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    document.body.classList.add("motion-ready");
  });
});

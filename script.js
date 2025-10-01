async function loadMenu() {
  const res = await fetch('menu.json');
  const data = await res.json();

  // ตรวจสอบภาษาที่เลือกจาก sessionStorage
  const savedLanguage = sessionStorage.getItem('selectedLanguage') || 'th';

  // ----- เมนูแนะนำ -----
  const recDiv = document.getElementById('recommended');
  recDiv.innerHTML = ''; // ล้างข้อมูลเก่าก่อนเพิ่มใหม่
  data.recommended.forEach(item => {
    // แปลงคำอธิบายตามภาษา (ตัวอย่าง)
    let description = item.description;
    if (savedLanguage === 'en') {
      // ตัวอย่างการแปล - ควรสร้าง object สำหรับเก็บคำแปลทั้งหมด
      if (description === "เนื้อนุ่มฉ่ำเสิร์ฟพร้อมซอสพริกไทยดำ") {
        description = "Tender, juicy served with black pepper sauce";
      } else if (description === "ปลาดิบคัดพิเศษ สดใหม่ทุกวัน") {
        description = "Special selected fresh fish, fresh daily";
      }
    }
    
    recDiv.innerHTML += `
      <div class="col-md-6">
        <div class="card h-100 shadow-sm">
          <img src="${item.image}" class="card-img-top img-fluid" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${description}</p>
            <p class="fw-bold text-primary">${item.price} ${savedLanguage === 'en' ? 'Baht' : 'บาท'}</p>
          </div>
        </div>
      </div>
    `;
  });

  // ----- หมวดหมู่เมนู -----
  const catDiv = document.getElementById('categories');
  catDiv.innerHTML = ''; // ล้างข้อมูลเก่าก่อนเพิ่มใหม่
  data.categories.forEach((cat, idx) => {
    // แปลงชื่อหมวดหมู่ตามภาษา (ตัวอย่าง)
    let categoryName = cat.name;
    if (savedLanguage === 'en') {
      // ตัวอย่างการแปล - ควรสร้าง object สำหรับเก็บคำแปลทั้งหมด
      if (categoryName === "เมนูแนะนำอื่นๆ") categoryName = "Other Recommended";
      else if (categoryName === "ส้มตำ") categoryName = "Som Tam (Papaya Salad)";
      else if (categoryName === "ยำ") categoryName = "Spicy Salads";
      else if (categoryName === "ลาบ / น้ำตก") categoryName = "Larb / Nam Tok";
      else if (categoryName === "ต้มยำ / ต้มแซ่บ / แกง") categoryName = "Tom Yum / Tom Sab / Curries";
      else if (categoryName === "อาหารจานเดี่ยว") categoryName = "single dish meal";
      else if (categoryName === "ผัดเผ็ด / ผัดฉ่า / ผัดกระเพรา / ผัดพริกแกง") categoryName = "Stir-fried Dishes";
      else if (categoryName === "เมนูปลา") categoryName = "Fish Menu";
      else if (categoryName === "เมนูทอด") categoryName = "Fried Menu";
      else if (categoryName === "ย่าง") categoryName = "grill Menu";
      else if (categoryName === "เพิ่มเติม") categoryName = "More menu";
      else if (categoryName === "เครื่องดื่ม") categoryName = "Beverages";
    }

    const itemsHTML = cat.items.map(i => {
      // แปลงชื่อเมนูตามภาษา (ควรสร้าง object สำหรับเก็บคำแปลทั้งหมด)
      let itemName = i.name;
      // ในที่นี้เป็นเพียงตัวอย่าง ให้เพิ่มคำแปลจริงตามต้องการ
      
      return `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>${itemName}</span>
          <span class="fw-bold text-primary">${i.price} ${savedLanguage === 'en' ? 'Baht' : 'บาท'}</span>
        </li>
      `;
    }).join('');

    catDiv.innerHTML += `
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading${idx}">
          <button class="accordion-button collapsed" type="button"
            data-bs-toggle="collapse" data-bs-target="#collapse${idx}"
            aria-expanded="false" aria-controls="collapse${idx}">
            ${categoryName}
          </button>
        </h2>
        <div id="collapse${idx}" class="accordion-collapse collapse"
             aria-labelledby="heading${idx}">
          <div class="accordion-body p-0">
            <ul class="list-group list-group-flush">
              ${itemsHTML}
            </ul>
          </div>
        </div>
      </div>
    `;
  });
}

// เมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', function() {
  // โหลดเมนู
  loadMenu();
});

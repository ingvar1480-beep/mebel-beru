const demoProducts = [
  { category: 'sofas', name: 'Диван «Оливер»', description: 'Мягкие формы и глубокая посадка для уютных вечеров.', price: '49 900 ₽', delivery: 'от 7 до 14 дней', option: 'Ткань', options: ['Рогожка, бежевый', 'Велюр, карамельный', 'Рогожка, серый'], image: 'photo-1555041469-a586c61ea9bc', tag: 'ЛЮБИМЫЙ ВЫБОР' },
  { category: 'sofas', name: 'Диван «Милан»', description: 'Лаконичный силуэт для гостиной в современном стиле.', price: '62 900 ₽', delivery: 'от 10 до 20 дней', option: 'Ткань', options: ['Велюр, молочный', 'Рогожка, песочный', 'Велюр, оливковый'], image: 'photo-1493663284031-b7e3aefcae8e', tag: 'УЮТ КАЖДЫЙ ДЕНЬ' },
  { category: 'beds', name: 'Кровать «Луна»', description: 'Мягкое изголовье и спокойный дизайн для вашего отдыха.', price: '38 900 ₽', delivery: 'от 7 до 14 дней', option: 'Подъёмный механизм', options: ['Без механизма', 'С подъёмным механизмом'], image: 'photo-1505693416388-ac5ce068fe85', tag: 'ДЛЯ СЛАДКИХ СНОВ' },
  { category: 'beds', name: 'Кровать «Норди»', description: 'Уютная основа спальни с выразительным изголовьем.', price: '42 900 ₽', delivery: 'от 10 до 20 дней', option: 'Подъёмный механизм', options: ['Без механизма', 'С подъёмным механизмом'], image: 'photo-1505693314120-0d443867891c', tag: 'СПОКОЙНЫЙ СОН' },
  { category: 'mattresses', name: 'Матрас «Комфорт»', description: 'Удобная поддержка для полноценного отдыха каждую ночь.', price: '18 900 ₽', delivery: 'от 5 до 10 дней', option: 'Размер', options: ['140 × 200 см', '160 × 200 см', '180 × 200 см'], second: ['Жёсткость', 'Средняя', 'Мягкая', 'Высокая'], image: 'photo-1631049307264-da0ec9d70304', tag: 'ДЛЯ ВАШЕГО ОТДЫХА' },
  { category: 'mattresses', name: 'Матрас «Баланс»', description: 'Комфортная поверхность и поддержка для здорового сна.', price: '23 900 ₽', delivery: 'от 5 до 12 дней', option: 'Размер', options: ['140 × 200 см', '160 × 200 см', '180 × 200 см'], second: ['Жёсткость', 'Средняя', 'Мягкая', 'Высокая'], image: 'photo-1616594039964-ae9021a400a0', tag: 'КОМФОРТ В ДЕТАЛЯХ' },
  { category: 'storage', name: 'Комод «Терра»', description: 'Вместительный комод для порядка в красивых деталях.', price: '24 900 ₽', delivery: 'от 7 до 14 дней', option: 'Цвет материала', options: ['Дуб натуральный', 'Белый', 'Орех'], image: 'photo-1583847268964-b28dc8f51f92', tag: 'ПОРЯДОК СТИЛЬНО' },
  { category: 'storage', name: 'Шкаф «Сканди»', description: 'Функциональное хранение в лаконичном исполнении.', price: '39 900 ₽', delivery: 'от 10 до 20 дней', option: 'Цвет материала', options: ['Белый', 'Дуб натуральный', 'Графит'], image: 'photo-1595428774223-ef52624120d2', tag: 'ВСЁ НА СВОИХ МЕСТАХ' },
  { category: 'kitchens', name: 'Кухня «Марсель»', description: 'Тёплая палитра и удобство для ваших кулинарных историй.', price: 'от 129 000 ₽', delivery: 'от 20 до 35 дней', option: 'Цвет фасадов', options: ['Тёплый белый', 'Песочный', 'Оливковый'], image: 'photo-1556912172-45b7abe8b7e1', tag: 'СЕРДЦЕ ВАШЕГО ДОМА' },
  { category: 'kitchens', name: 'Кухня «Вива»', description: 'Современное решение для встреч, завтраков и разговоров.', price: 'от 149 000 ₽', delivery: 'от 20 до 40 дней', option: 'Цвет фасадов', options: ['Бежевый', 'Белый', 'Графит'], image: 'photo-1556911220-bff31c812dba', tag: 'ГОТОВЬТЕ С ЛЮБОВЬЮ' }
];

// Images and catalogue details are illustrative until the store's real assortment is provided.
const names = { all: 'Вся мебель', sofas: 'Диваны', beds: 'Кровати', mattresses: 'Матрасы', storage: 'Корпусная мебель', kitchens: 'Кухни' };
const container = document.querySelector('#products');
const client = window.supabase?.createClient('https://pnuwselaenbyfquchvbo.supabase.co', 'sb_publishable_Hq7z_jUuz4pyVVayPJVMg_-ULTorUR');
let products = demoProducts;
let currentCategory = 'all';
let isAdmin = false;
let databaseReady = false;
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const safeImage = value => {
  if (/^photo-[\w-]+$/.test(value)) return `https://images.unsplash.com/${value}?auto=format&fit=crop&w=900&q=80`;
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : ''; } catch { return ''; }
};

const colors = { 'бежевый': '#d8c2aa', 'карамельный': '#af8060', 'серый': '#a3a19c', 'молочный': '#ede4d7', 'песочный': '#d9c7a9', 'оливковый': '#899078', 'дуб натуральный': '#c7a77d', 'белый': '#f5f2ea', 'орех': '#8e684f', 'графит': '#555751', 'тёплый белый': '#eee9dd' };

function optionMarkup(label, values, id, swatches = false) {
  return `<fieldset class="option-group"><legend>${escapeHtml(label)}</legend><div class="option-choices ${swatches ? 'swatch-choices' : ''}">${values.map((value, i) => {
    const color = colors[value.split(', ').pop().toLowerCase()] || '#d8c2aa';
    return `<label class="choice"><input type="radio" name="${id}" value="${escapeHtml(value)}" ${i === 0 ? 'checked' : ''}><span>${swatches ? `<i class="swatch" style="--swatch:${color}" aria-hidden="true"></i>` : ''}${escapeHtml(value)}</span></label>`;
  }).join('')}</div></fieldset>`;
}

function showCategory(category) {
  if (!names[category]) category = 'all';
  currentCategory = category;
  const visible = products.filter(product => category === 'all' || product.category === category);
  document.querySelector('#catalog-title').firstChild.textContent = `${names[category]} `;
  document.querySelector('#product-count').textContent = `(${visible.length})`;
  document.querySelectorAll('.category').forEach(button => button.classList.toggle('active', button.dataset.category === category));
  container.innerHTML = visible.map((product, index) => `<article class="product">
    <div class="product-image"><img src="${escapeHtml(safeImage(product.image))}" alt="${escapeHtml(product.name)}" loading="lazy"><span>${escapeHtml(product.tag)}</span></div>
    <div class="product-body"><div class="product-heading"><div><p class="product-category">${names[product.category]}</p><h3>${escapeHtml(product.name)}</h3></div><strong>${escapeHtml(product.price)}</strong></div>
    <p class="product-description">${escapeHtml(product.description)}</p><p class="delivery"><span aria-hidden="true">◷</span> Доставка <strong>${escapeHtml(product.delivery)}</strong></p>
    <div class="options">${product.option && product.options.length ? optionMarkup(product.option, product.options, `option-${index}`, ['sofas', 'storage', 'kitchens'].includes(product.category)) : ''}${product.second && product.second.length > 1 ? optionMarkup(product.second[0], product.second.slice(1), `second-${index}`) : ''}</div>${isAdmin && product.id ? `<div class="product-admin"><button data-edit="${escapeHtml(product.id)}">Изменить</button><button data-delete="${escapeHtml(product.id)}">Удалить</button></div>` : ''}</div>
  </article>`).join('') || '<p>В этой категории пока нет товаров.</p>';
}

document.querySelectorAll('[data-category]').forEach(control => control.addEventListener('click', () => showCategory(control.dataset.category)));
document.querySelectorAll('.mobile-menu nav a').forEach(link => link.addEventListener('click', () => {
  document.querySelector('.mobile-menu').open = false;
}));
showCategory('all');

const authDialog = document.querySelector('#auth-dialog');
const productDialog = document.querySelector('#product-dialog');
const productForm = document.querySelector('#product-form');
const status = document.querySelector('#catalog-status');

async function loadProducts() {
  if (!client) { status.textContent = 'Не удалось подключить каталог. Показаны примеры товаров.'; return; }
  const { data, error } = await client.from('products').select('*').order('created_at');
  if (error) { databaseReady = false; status.textContent = 'Каталог временно недоступен. Показаны примеры товаров.'; products = demoProducts; }
  else {
    databaseReady = true;
    products = data.map(row => ({ ...row, option: row.option_label, options: Array.isArray(row.options) ? row.options : [], second: row.second_label ? [row.second_label, ...(Array.isArray(row.second_options) ? row.second_options : [])] : null }));
    status.textContent = '';
  }
  document.querySelector('#demo-note').hidden = databaseReady;
  document.querySelector('#add-product').hidden = !isAdmin || !databaseReady;
  showCategory(currentCategory);
}

async function updateAdmin() {
  isAdmin = false;
  if (client) {
    const { data: { user } } = await client.auth.getUser();
    if (user) {
      const { data } = await client.from('admins').select('user_id').eq('user_id', user.id).maybeSingle();
      isAdmin = !!data;
    }
  }
  document.querySelector('#admin-bar').hidden = !isAdmin;
  document.querySelector('#add-product').hidden = !isAdmin || !databaseReady;
  showCategory(currentCategory);
  return isAdmin;
}

document.querySelector('#admin-entry').addEventListener('click', () => { if (!authDialog.open) authDialog.showModal(); });
document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.shiftKey && event.code === 'KeyM' && !event.repeat) {
    event.preventDefault(); if (!authDialog.open) authDialog.showModal();
  }
});
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
document.querySelector('#auth-form').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget, message = form.querySelector('.form-message');
  if (!client) { message.textContent = 'Не удалось подключиться к сервису авторизации.'; return; }
  message.textContent = 'Выполняется вход…';
  const { error } = await client.auth.signInWithPassword({ email: form.elements.email.value.trim(), password: form.elements.password.value });
  if (error) { message.textContent = 'Не удалось войти. Проверьте почту и пароль.'; return; }
  if (!await updateAdmin()) { await client.auth.signOut(); message.textContent = 'У этой учётной записи нет прав администратора.'; return; }
  message.textContent = ''; form.reset(); authDialog.close();
});
document.querySelector('#sign-out').addEventListener('click', async () => { await client.auth.signOut(); await updateAdmin(); });
document.querySelector('#calendar-open').addEventListener('click', () => document.querySelector('#calendar-dialog').showModal());

function openProduct(product = null) {
  productForm.reset();
  productForm.querySelector('.form-message').textContent = '';
  document.querySelector('#product-form-title').textContent = product ? 'Изменить товар' : 'Добавить товар';
  for (const key of ['id', 'category', 'name', 'description', 'price', 'delivery', 'image', 'tag']) productForm.elements[key].value = product?.[key] || '';
  if (!product) productForm.elements.category.value = currentCategory === 'all' ? 'sofas' : currentCategory;
  productForm.elements.image.value = product ? safeImage(product.image) : '';
  productForm.elements.option_label.value = product?.option || '';
  productForm.elements.options.value = (product?.options || []).join('\n');
  productForm.elements.second_label.value = product?.second?.[0] || '';
  productForm.elements.second_options.value = (product?.second?.slice(1) || []).join('\n');
  productDialog.showModal();
}
document.querySelector('#add-product').addEventListener('click', () => openProduct());
container.addEventListener('click', async event => {
  const edit = event.target.closest('[data-edit]'), remove = event.target.closest('[data-delete]');
  if (edit) { const product = products.find(item => item.id === edit.dataset.edit); if (product) openProduct(product); }
  if (remove && confirm('Удалить товар из каталога?')) {
    const { error } = await client.from('products').delete().eq('id', remove.dataset.delete);
    if (error) alert('Не удалось удалить товар. Проверьте подключение и права доступа.'); else await loadProducts();
  }
});
productForm.addEventListener('submit', async event => {
  event.preventDefault();
  const fields = productForm.elements, message = productForm.querySelector('.form-message'), submit = productForm.querySelector('[type=submit]');
  if (!isAdmin || !databaseReady) return;
  const file = fields.photo.files[0];
  if (file && (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024)) { message.textContent = 'Выберите JPG, PNG или WebP размером до 5 МБ.'; return; }
  let image = fields.image.value.trim();
  if (!file && !safeImage(image)) { message.textContent = 'Добавьте фотографию или укажите ссылку HTTPS.'; return; }
  submit.disabled = true; message.textContent = 'Сохранение…';
  try {
    if (file) {
      const path = `${crypto.randomUUID()}.${({'image/jpeg':'jpg','image/png':'png','image/webp':'webp'})[file.type]}`;
      const upload = await client.storage.from('product-images').upload(path, file, { contentType: file.type });
      if (upload.error) throw upload.error;
      image = client.storage.from('product-images').getPublicUrl(path).data.publicUrl;
    }
    const lines = value => value.split('\n').map(x => x.trim()).filter(Boolean);
    const row = { category: fields.category.value, name: fields.name.value.trim(), description: fields.description.value.trim(), price: fields.price.value.trim(), delivery: fields.delivery.value.trim(), image, tag: fields.tag.value.trim(), option_label: fields.option_label.value.trim(), options: lines(fields.options.value), second_label: fields.second_label.value.trim(), second_options: lines(fields.second_options.value) };
    const result = fields.id.value ? await client.from('products').update(row).eq('id', fields.id.value).select() : await client.from('products').insert(row).select();
    if (result.error || !result.data.length) throw result.error || new Error('No rows saved');
    productDialog.close(); await loadProducts();
  } catch { message.textContent = 'Не удалось сохранить товар. Проверьте подключение и права доступа.'; }
  finally { submit.disabled = false; }
});
loadProducts().then(updateAdmin);

'use strict';

// Local phrase bank: 20 themes × 10 anchors × 10 frames = 2,000 entries.
const LEVELS=[
 {code:'A0',name:'البداية',title:'البداية A0',hint:'ابدأ بالعبارات القصيرة والكلمات التي ستحتاجها في أول يوم لك في إسبانيا.'},
 {code:'A1',name:'مبتدئ',title:'مبتدئ A1',hint:'لاحظ كيف تساعدك هذه العبارة على التعامل بثقة في المواقف اليومية.'},
 {code:'A2',name:'أساسي',title:'أساسي A2',hint:'اقرأ العبارة كاملة، وانتبه للزمن وطريقة ربط الأفكار.'},
 {code:'B1',name:'متوسط',title:'متوسط B1',hint:'جرّب نطق العبارة بإيقاع طبيعي، كأنك تتحدث مع صديق إسباني.'}
];
const TOPICS=[
 {level:0,name:'في المقهى',caption:'Una mañana en Madrid',items:[['un café','قهوة'],['un té con leche','شاي بالحليب'],['un zumo de naranja','عصير برتقال'],['agua fría','ماء بارد'],['una tostada','خبز محمّص'],['un bocadillo','شطيرة'],['la cuenta','الحساب'],['una mesa junto a la ventana','طاولة بجانب النافذة'],['el menú del día','قائمة طعام اليوم'],['una botella de agua','زجاجة ماء']]},
 {level:0,name:'في المدينة',caption:'Un paseo por Valencia',items:[['la estación','المحطة'],['el mercado','السوق'],['la farmacia','الصيدلية'],['el museo','المتحف'],['la plaza mayor','الساحة الرئيسية'],['un taxi','سيارة أجرة'],['el baño','الحمّام'],['una parada de autobús','موقف الحافلة'],['la oficina de turismo','مكتب السياحة'],['un mapa de la ciudad','خريطة المدينة']]},
 {level:0,name:'في المنزل',caption:'Una casa acogedora',items:[['una llave','مفتاح'],['una silla cómoda','كرسي مريح'],['la cocina','المطبخ'],['una manta','بطانية'],['el teléfono','الهاتف'],['una taza grande','كوب كبير'],['la puerta','الباب'],['una lámpara','مصباح'],['un cargador','شاحن'],['las gafas','النظارات']]},
 {level:0,name:'التسوّق',caption:'De compras en Sevilla',items:[['una bolsa','حقيبة'],['una camiseta azul','قميص أزرق'],['un vestido','فستان'],['unos zapatos cómodos','حذاء مريح'],['una talla más grande','مقاس أكبر'],['el precio','السعر'],['una tarjeta de crédito','بطاقة ائتمان'],['un recibo','إيصال'],['un regalo bonito','هدية جميلة'],['una chaqueta ligera','سترة خفيفة']]},
 {level:0,name:'التعارف',caption:'Un encuentro en Madrid',items:[['mi nombre','اسمي'],['tu número de teléfono','رقم هاتفك'],['una foto','صورة'],['una dirección de correo','عنوان بريد إلكتروني'],['una mesa para dos','طاولة لشخصين'],['un momento','لحظة'],['la carta en español','القائمة بالإسبانية'],['un billete sencillo','تذكرة ذهاب فقط'],['la salida','المخرج'],['una recomendación','توصية']]},
 {level:1,name:'روتين الصباح',caption:'Una mañana tranquila',items:[['un café con leche','قهوة بالحليب'],['la ducha caliente','الدش الدافئ'],['el desayuno','الفطور'],['el autobús de las ocho','حافلة الثامنة'],['mi agenda','مذكرتي اليومية'],['un paseo corto','نزهة قصيرة'],['la radio','الراديو'],['la ropa de trabajo','ملابس العمل'],['una tostada con tomate','خبز محمّص بالطماطم'],['las noticias de la mañana','أخبار الصباح']]},
 {level:1,name:'السفر بالقطار',caption:'En la estación de Atocha',items:[['un billete de ida y vuelta','تذكرة ذهاب وإياب'],['el tren de las diez','قطار العاشرة'],['un asiento junto a la ventana','مقعد بجانب النافذة'],['la vía número tres','المسار رقم ثلاثة'],['mi maleta pequeña','حقيبتي الصغيرة'],['el horario actualizado','الجدول المحدّث'],['la estación central','المحطة المركزية'],['un billete para Toledo','تذكرة إلى طليطلة'],['la cafetería de la estación','مقهى المحطة'],['el próximo tren','القطار القادم']]},
 {level:1,name:'في الفندق',caption:'Una estancia agradable',items:[['una habitación tranquila','غرفة هادئة'],['la llave de mi habitación','مفتاح غرفتي'],['el desayuno incluido','الفطور المشمول'],['una toalla limpia','منشفة نظيفة'],['la contraseña del wifi','كلمة مرور الواي فاي'],['una noche más','ليلة إضافية'],['la recepción del hotel','استقبال الفندق'],['una habitación con balcón','غرفة مع شرفة'],['el servicio de habitaciones','خدمة الغرف'],['una recomendación para cenar','توصية للعشاء']]},
 {level:1,name:'الطعام الإسباني',caption:'Sabores de España',items:[['una tortilla de patatas','عجة البطاطس الإسبانية'],['unas tapas para compartir','مقبلات للمشاركة'],['el gazpacho andaluz','حساء غازباتشو الأندلسي'],['un plato de paella','طبق باييا'],['pan con tomate','خبز بالطماطم'],['una ración de aceitunas','حصة من الزيتون'],['el queso manchego','جبن مانشيغو'],['un postre casero','حلوى منزلية'],['la carta de vinos','قائمة النبيذ'],['una mesa en la terraza','طاولة في الشرفة']]},
 {level:1,name:'الخدمات اليومية',caption:'Un día lleno de gestiones',items:[['una cita en el ayuntamiento','موعد في البلدية'],['un paquete para recoger','طرد لاستلامه'],['la oficina de correos','مكتب البريد'],['una factura de electricidad','فاتورة الكهرباء'],['el horario de apertura','ساعات العمل'],['una tarjeta sanitaria','بطاقة صحية'],['el número de turno','رقم الدور'],['una llamada pendiente','مكالمة معلّقة'],['un formulario sencillo','استمارة بسيطة'],['la dirección correcta','العنوان الصحيح']]},
 {level:2,name:'الصحة والعافية',caption:'Cuidarse cada día',items:[['una cita con el médico','موعد مع الطبيب'],['un dolor de cabeza','صداع'],['la receta médica','الوصفة الطبية'],['un análisis de sangre','تحليل دم'],['una alimentación equilibrada','تغذية متوازنة'],['hacer ejercicio con regularidad','ممارسة الرياضة بانتظام'],['las horas de descanso','ساعات الراحة'],['una farmacia de guardia','صيدلية مناوبة'],['los síntomas de la alergia','أعراض الحساسية'],['una botella de agua mineral','زجاجة مياه معدنية']]},
 {level:2,name:'العمل والدراسة',caption:'En la oficina y en clase',items:[['una reunión de equipo','اجتماع الفريق'],['el plazo de entrega','موعد التسليم'],['un correo importante','رسالة بريد مهمة'],['una presentación breve','عرض تقديمي قصير'],['la biblioteca municipal','المكتبة البلدية'],['un curso de formación','دورة تدريبية'],['mis compañeros de trabajo','زملائي في العمل'],['el horario flexible','جدول مرن'],['una solicitud de empleo','طلب توظيف'],['un proyecto interesante','مشروع ممتع']]},
 {level:2,name:'السكن والحي',caption:'La vida en el barrio',items:[['un piso luminoso','شقة مضيئة'],['los gastos de comunidad','رسوم الخدمات المشتركة'],['una parada cercana','موقف قريب'],['el contrato de alquiler','عقد الإيجار'],['un vecino muy atento','جار متعاون جدًا'],['la recogida de basura','جمع القمامة'],['una zona tranquila','منطقة هادئة'],['el mercado del barrio','سوق الحي'],['una llave de repuesto','مفتاح احتياطي'],['las normas del edificio','قواعد المبنى']]},
 {level:2,name:'الطقس والطبيعة',caption:'Un día al aire libre',items:[['un cielo despejado','سماء صافية'],['la previsión del tiempo','توقعات الطقس'],['una lluvia inesperada','مطر مفاجئ'],['el viento del norte','رياح الشمال'],['un sendero de montaña','مسار جبلي'],['la puesta de sol','غروب الشمس'],['una ola de calor','موجة حر'],['los espacios verdes','المساحات الخضراء'],['un paraguas resistente','مظلة متينة'],['la temperatura media','متوسط درجة الحرارة']]},
 {level:2,name:'المواصلات والسفر',caption:'Rutas y destinos',items:[['un retraso de veinte minutos','تأخير عشرين دقيقة'],['la tarjeta de transporte','بطاقة المواصلات'],['un cambio de línea','تغيير الخط'],['el equipaje de mano','أمتعة اليد'],['una ruta alternativa','طريق بديل'],['la puerta de embarque','بوابة الصعود'],['un viaje de negocios','رحلة عمل'],['el billete electrónico','التذكرة الإلكترونية'],['una conexión directa','رحلة ربط مباشرة'],['el centro histórico','الحي التاريخي']]},
 {level:3,name:'الرأي والنقاش',caption:'Conversaciones con matices',items:[['un punto de vista diferente','وجهة نظر مختلفة'],['una decisión importante','قرار مهم'],['el argumento principal','الحجة الرئيسية'],['una solución razonable','حل معقول'],['las consecuencias a largo plazo','العواقب بعيدة المدى'],['un debate constructivo','نقاش بنّاء'],['la opinión de la mayoría','رأي الأغلبية'],['una propuesta concreta','اقتراح محدد'],['el contexto de la situación','سياق الموقف'],['un acuerdo provisional','اتفاق مؤقت']]},
 {level:3,name:'الإعلام والتقنية',caption:'Conectados e informados',items:[['una fuente de información fiable','مصدر معلومات موثوق'],['la protección de datos personales','حماية البيانات الشخصية'],['un dispositivo electrónico','جهاز إلكتروني'],['la conexión a internet','الاتصال بالإنترنت'],['una noticia de última hora','خبر عاجل'],['el uso responsable de las redes','الاستخدام المسؤول للشبكات'],['una herramienta digital','أداة رقمية'],['la privacidad de la cuenta','خصوصية الحساب'],['un mensaje de voz','رسالة صوتية'],['la actualización del sistema','تحديث النظام']]},
 {level:3,name:'الثقافة والمجتمع',caption:'Cultura y vida social',items:[['una exposición de arte contemporáneo','معرض للفن المعاصر'],['las costumbres locales','العادات المحلية'],['un festival de música','مهرجان موسيقي'],['la diversidad cultural','التنوع الثقافي'],['una obra de teatro','مسرحية'],['el patrimonio histórico','التراث التاريخي'],['un evento benéfico','فعالية خيرية'],['la convivencia en comunidad','التعايش المجتمعي'],['una tradición familiar','تقليد عائلي'],['el acceso a la cultura','إمكانية الوصول إلى الثقافة']]},
 {level:3,name:'البيئة والاستدامة',caption:'Un futuro más sostenible',items:[['el consumo de energía','استهلاك الطاقة'],['una fuente renovable','مصدر متجدد'],['la reducción de residuos','تقليل النفايات'],['un transporte menos contaminante','مواصلات أقل تلويثًا'],['la escasez de agua','شح المياه'],['una iniciativa ciudadana','مبادرة أهلية'],['el cambio climático','التغير المناخي'],['los productos de temporada','المنتجات الموسمية'],['una medida sostenible','إجراء مستدام'],['la protección de la biodiversidad','حماية التنوع الحيوي']]},
 {level:3,name:'الخطط والأهداف',caption:'Mirando hacia adelante',items:[['un objetivo a medio plazo','هدف متوسط المدى'],['la experiencia profesional','الخبرة المهنية'],['una oportunidad de aprendizaje','فرصة للتعلم'],['el equilibrio entre trabajo y vida','التوازن بين العمل والحياة'],['un cambio de rumbo','تغيير المسار'],['la próxima etapa del proyecto','المرحلة التالية من المشروع'],['una meta alcanzable','غاية قابلة للتحقيق'],['el desarrollo de nuevas habilidades','تطوير مهارات جديدة'],['una decisión bien meditada','قرار مدروس جيدًا'],['las prioridades de este año','أولويات هذا العام']]}
];

const FRAMES=[
 ['Quisiera {es}, por favor.','أودّ {ar}، من فضلك.'],
 ['Estoy buscando {es}.','أبحث عن {ar}.'],
 ['¿Podría ayudarme con {es}?','هل يمكنك مساعدتي بخصوص {ar}؟'],
 ['Me gustaría saber más sobre {es}.','أودّ معرفة المزيد عن {ar}.'],
 ['¿Dónde puedo encontrar {es}?','أين يمكنني العثور على {ar}؟'],
 ['¿Tiene información sobre {es}?','هل لديك معلومات عن {ar}؟'],
 ['Quiero preguntar por {es}.','أريد الاستفسار عن {ar}.'],
 ['¿Qué me recomienda para {es}?','ماذا تنصحني بشأن {ar}؟'],
 ['Estoy pensando en {es}.','أفكر في {ar}.'],
 ['Para mí, es importante hablar de {es}.','من المهم بالنسبة إليّ أن أتحدث عن {ar}.']
];
function renderFrame(es,ar,frameIndex){
 const actionOverrides={
  2:[`¿Podría ayudarme a ${es}?`,`هل يمكنك مساعدتي على ${ar}؟`],
  4:[`¿Dónde puedo ${es}?`,`أين يمكنني ${ar}؟`],
  6:[`Quiero preguntar cómo ${es}.`,`أريد أن أسأل عن كيفية ${ar}.`]
 };
 if(es.startsWith('hacer ')&&actionOverrides[frameIndex])return {es:actionOverrides[frameIndex][0],ar:actionOverrides[frameIndex][1]};
 const [esFrame,arFrame]=FRAMES[frameIndex];
 return {es:esFrame.replace('{es}',es),ar:arFrame.replace('{ar}',ar)};
}
const PHRASES=TOPICS.flatMap((topic,topicIndex)=>topic.items.flatMap(([es,ar],anchorIndex)=>FRAMES.map((_,frameIndex)=>({
 id:(topicIndex*10+anchorIndex)*10+frameIndex,level:topic.level,topic:topic.name,caption:topic.caption,
 ...renderFrame(es,ar,frameIndex),hint:LEVELS[topic.level].hint
}))));
const STORAGE_KEY='hola-es-progress-v1';
const DAILY_TARGETS=[5,10,15,20];
const VIEW_TITLES={learnView:'تعلّم اليوم',libraryView:'مكتبة الجمل',savedView:'المحفوظات'};
const $=id=>document.getElementById(id);
const arabicNumber=value=>new Intl.NumberFormat('ar').format(value);
const todayKey=()=>{const date=new Date();return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`};
function freshState(){return {done:[],saved:[],today:todayKey(),todayDone:[],streak:0,lastActive:'',dailyGoal:5,currentId:0}}
function loadState(){
 try{
  const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
  if(!saved||typeof saved!=='object')return freshState();
  const state={...freshState(),...saved};
  state.done=Array.isArray(state.done)?state.done.filter(id=>Number.isInteger(id)&&id>=0&&id<PHRASES.length):[];
  state.saved=Array.isArray(state.saved)?state.saved.filter(id=>Number.isInteger(id)&&id>=0&&id<PHRASES.length):[];
  state.todayDone=Array.isArray(state.todayDone)?state.todayDone.filter(id=>Number.isInteger(id)&&id>=0&&id<PHRASES.length):[];
  if(state.today!==todayKey()){state.today=todayKey();state.todayDone=[]}
  if(!DAILY_TARGETS.includes(state.dailyGoal))state.dailyGoal=5;
  if(!Number.isInteger(state.currentId)||state.currentId<0||state.currentId>=PHRASES.length)state.currentId=0;
  return state;
 }catch{return freshState()}
}
let state=loadState();
let activeView='learnView',libraryFilter='all',visibleCount=50,toastTimer;
let mediaRecorder=null,recordingChunks=[],recordingBlob=null,recordingUrl='',recordingTimer=null,recordingStarted=0,recordingAudio=null;
function persist(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}catch{notify('تعذّر حفظ التقدم على هذا الجهاز.')}}
function notify(message){const toast=$('toast');if(!toast)return;toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)}
function speak(text){if(!('speechSynthesis' in window)||!('SpeechSynthesisUtterance' in window)){notify('النطق الصوتي غير متاح في هذا المتصفح.');return}window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='es-ES';utterance.rate=.82;window.speechSynthesis.speak(utterance)}
function updateStreak(){
 const today=todayKey();if(state.lastActive===today)return;
 if(state.lastActive){const previous=new Date(`${state.lastActive}T00:00:00`),current=new Date(`${today}T00:00:00`),gap=Math.round((current-previous)/86400000);state.streak=gap===1?state.streak+1:gap>1?1:state.streak}else state.streak=1;
 state.lastActive=today;
}
function markDone(id){
 if(!state.done.includes(id))state.done.push(id);
 if(state.today!==todayKey()){state.today=todayKey();state.todayDone=[]}
 if(!state.todayDone.includes(id))state.todayDone.push(id);
 updateStreak();persist();renderProgress();
}
function renderProgress(){
 const doneCount=Math.min(state.done.length,PHRASES.length);$('doneCount').textContent=arabicNumber(doneCount);
 $('journeyProgress').style.width=`${doneCount/PHRASES.length*100}%`;
 const currentLevel=LEVELS[Math.min(3,Math.floor(doneCount/500))];$('levelName').textContent=`${currentLevel.name} ${currentLevel.code}`;
 $('topStreak').textContent=arabicNumber(state.streak);$('streakLabel').textContent=state.streak?`أحسنت! ${arabicNumber(state.streak)} أيام متتالية`:'يوم جديد، بداية جميلة!';
 const todayDone=state.todayDone.length,percent=Math.min(100,Math.round(todayDone/state.dailyGoal*100));
 $('todayDone').textContent=arabicNumber(todayDone);$('dailyPercent').textContent=`${arabicNumber(percent)}٪`;$('dailyProgress').style.width=`${percent}%`;
 $('dailyGoalButton').textContent=`هدف ${arabicNumber(state.dailyGoal)} يومي ✦`;
}
function renderLesson(){
 const phrase=PHRASES[state.currentId];if(!phrase)return;
 $('lessonLevel').textContent=`${LEVELS[phrase.level].code} · ${LEVELS[phrase.level].name}`;$('lessonTopic').textContent=phrase.topic;
 $('lessonNumber').textContent=`الجملة ${arabicNumber(phrase.id+1).padStart(2,'٠')}`;
 $('spanishSentence').textContent=phrase.es;$('arabicSentence').textContent=phrase.ar;$('sentenceHint').textContent=phrase.hint;$('sceneCaption').textContent=phrase.caption;
 $('saveButton').textContent=state.saved.includes(phrase.id)?'♥':'♡';$('saveButton').classList.toggle('saved',state.saved.includes(phrase.id));$('saveButton').setAttribute('aria-pressed',String(state.saved.includes(phrase.id)));
 document.querySelectorAll('.level-tab').forEach(button=>button.classList.toggle('selected',Number(button.dataset.level)===phrase.level));
}
function showView(viewId){
 if(!VIEW_TITLES[viewId])return;activeView=viewId;
 document.querySelectorAll('.view').forEach(view=>view.classList.toggle('active',view.id===viewId));
 document.querySelectorAll('.nav-item').forEach(button=>button.classList.toggle('active',button.dataset.view===viewId.replace('View','')));
 $('crumbTitle').textContent=VIEW_TITLES[viewId];$('sidebar').classList.remove('open');
 if(viewId==='libraryView')renderLibrary();if(viewId==='savedView')renderSaved();
}
function goToPhrase(id){if(!Number.isInteger(id)||id<0||id>=PHRASES.length)return;state.currentId=id;persist();renderLesson();showView('learnView');window.scrollTo({top:0,behavior:'smooth'})}
function moveLesson(direction){
 const next=Math.max(0,Math.min(PHRASES.length-1,state.currentId+direction));
 if(next===state.currentId){notify(direction>0?'وصلت إلى آخر جملة.':'هذه أول جملة.');return}
 if(direction>0)markDone(state.currentId);state.currentId=next;persist();renderLesson();
}
function toggleSaved(id){
 const index=state.saved.indexOf(id);if(index<0){state.saved.unshift(id);notify('أُضيفت الجملة إلى المحفوظات.')}else{state.saved.splice(index,1);notify('أُزيلت الجملة من المحفوظات.')}
 persist();renderLesson();if(activeView==='savedView')renderSaved();
}
function rowFor(phrase){
 const row=document.createElement('article');row.className='phrase-row';
 const text=document.createElement('div');text.className='phrase-row-text';
 const spanish=document.createElement('b');spanish.className='phrase-row-spanish';spanish.lang='es';spanish.textContent=phrase.es;
 const arabic=document.createElement('span');arabic.className='phrase-row-arabic';arabic.textContent=phrase.ar;text.append(spanish,arabic);
 const tag=document.createElement('span');tag.className='phrase-row-tag';tag.textContent=LEVELS[phrase.level].code;
 const actions=document.createElement('div');actions.className='phrase-row-actions';
 const play=document.createElement('button');play.className='phrase-row-button';play.type='button';play.textContent='🔊';play.title='استمع';play.setAttribute('aria-label','استمع إلى العبارة');play.addEventListener('click',()=>speak(phrase.es));
 const save=document.createElement('button');save.className='phrase-row-button';save.type='button';save.textContent=state.saved.includes(phrase.id)?'♥':'♡';save.title='حفظ';save.setAttribute('aria-label','حفظ العبارة');save.addEventListener('click',()=>toggleSaved(phrase.id));
 const open=document.createElement('button');open.className='phrase-row-button';open.type='button';open.textContent='↗';open.title='افتح الدرس';open.setAttribute('aria-label','افتح الدرس');open.addEventListener('click',()=>goToPhrase(phrase.id));
 actions.append(play,save,open);row.append(text,tag,actions);return row;
}
function filteredPhrases(){
 const query=$('searchInput').value.trim().toLocaleLowerCase();
 return PHRASES.filter(phrase=>(libraryFilter==='all'||phrase.level===Number(libraryFilter))&&(!query||phrase.es.toLocaleLowerCase().includes(query)||phrase.ar.toLocaleLowerCase().includes(query)||phrase.topic.toLocaleLowerCase().includes(query)));
}
function renderLibrary(){
 const phrases=filteredPhrases(),list=$('phraseList');list.replaceChildren();
 phrases.slice(0,visibleCount).forEach(phrase=>list.append(rowFor(phrase)));
 $('resultCount').textContent=`${arabicNumber(phrases.length)} جملة`;$('loadMore').hidden=phrases.length<=visibleCount;
 $('loadMore').textContent=`عرض ${arabicNumber(Math.min(50,phrases.length-visibleCount))} جملة أخرى ↓`;
}
function renderSaved(){
 const list=$('savedList');list.replaceChildren();const phrases=state.saved.map(id=>PHRASES[id]).filter(Boolean);
 phrases.forEach(phrase=>list.append(rowFor(phrase)));$('emptySaved').hidden=phrases.length>0;
}
function setLibraryFilter(filter){libraryFilter=filter;visibleCount=50;document.querySelectorAll('.filter-pill').forEach(button=>button.classList.toggle('active',button.dataset.filter===filter));renderLibrary()}
function formatTime(seconds){return `${arabicNumber(Math.floor(seconds/60)).padStart(2,'٠')}:${arabicNumber(seconds%60).padStart(2,'٠')}`}
function stopRecordingTimer(){clearInterval(recordingTimer);recordingTimer=null}
function resetRecordingUi(){
 $('recordButton').classList.remove('recording');$('recordButton').setAttribute('aria-label','ابدأ التسجيل');$('recordStatus').textContent='اضغط للتسجيل';$('recordTimer').textContent='٠٠:٠٠';
 $('playRecording').disabled=!recordingBlob;$('discardRecording').disabled=!recordingBlob;
}
async function startRecording(){
 if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){notify('التسجيل غير مدعوم في هذا المتصفح.');return}
 try{
  const stream=await navigator.mediaDevices.getUserMedia({audio:true});
  const options=MediaRecorder.isTypeSupported('audio/webm;codecs=opus')?{mimeType:'audio/webm;codecs=opus'}:{};
  const recorder=new MediaRecorder(stream,options);mediaRecorder=recorder;recordingChunks=[];
  recorder.addEventListener('dataavailable',event=>{if(event.data.size)recordingChunks.push(event.data)});
  recorder.addEventListener('stop',()=>{
   stream.getTracks().forEach(track=>track.stop());if(recordingUrl)URL.revokeObjectURL(recordingUrl);
   recordingBlob=new Blob(recordingChunks,{type:recorder.mimeType||'audio/webm'});recordingUrl=URL.createObjectURL(recordingBlob);recordingAudio=new Audio(recordingUrl);
   if(mediaRecorder===recorder)mediaRecorder=null;resetRecordingUi();$('recordStatus').textContent='تم حفظ التسجيل على جهازك';
  },{once:true});
  recorder.start();recordingStarted=Date.now();$('recordButton').classList.add('recording');$('recordButton').setAttribute('aria-label','إيقاف التسجيل');$('recordStatus').textContent='جارٍ التسجيل…';
  $('playRecording').disabled=true;$('discardRecording').disabled=true;
  recordingTimer=setInterval(()=>{$('recordTimer').textContent=formatTime(Math.floor((Date.now()-recordingStarted)/1000))},250);
 }catch(error){notify(error?.name==='NotAllowedError'?'اسمح باستخدام الميكروفون لبدء التسجيل.':'تعذّر الوصول إلى الميكروفون. تحقق من إعدادات جهازك.');resetRecordingUi()}
}
function stopRecording(){if(mediaRecorder?.state==='recording'){stopRecordingTimer();mediaRecorder.stop()}}
function toggleRecording(){if(mediaRecorder?.state==='recording')stopRecording();else startRecording()}
function discardRecording(){
 if(recordingUrl)URL.revokeObjectURL(recordingUrl);recordingUrl='';recordingBlob=null;recordingAudio=null;recordingChunks=[];resetRecordingUi();notify('حُذف التسجيل.');
}
function init(){
 if(PHRASES.length!==2000)console.error(`Expected 2000 phrases, got ${PHRASES.length}`);
 $('todayLabel').textContent=new Intl.DateTimeFormat('ar',{weekday:'long',day:'numeric',month:'long'}).format(new Date());
 renderLesson();renderProgress();
 document.querySelectorAll('.nav-item').forEach(button=>button.addEventListener('click',()=>showView(`${button.dataset.view}View`)));
 document.querySelectorAll('[data-go]').forEach(button=>button.addEventListener('click',()=>showView(button.dataset.go)));
 document.querySelectorAll('.level-tab').forEach(button=>button.addEventListener('click',()=>{const phrase=PHRASES.find(item=>item.level===Number(button.dataset.level));if(phrase)goToPhrase(phrase.id)}));
 $('nextButton').addEventListener('click',()=>moveLesson(1));$('prevButton').addEventListener('click',()=>moveLesson(-1));
 $('saveButton').addEventListener('click',()=>toggleSaved(state.currentId));$('speakButton').addEventListener('click',()=>speak(PHRASES[state.currentId].es));
 $('searchInput').addEventListener('input',()=>{visibleCount=50;renderLibrary()});
 document.querySelectorAll('.filter-pill').forEach(button=>button.addEventListener('click',()=>setLibraryFilter(button.dataset.filter)));
 $('loadMore').addEventListener('click',()=>{visibleCount+=50;renderLibrary()});
 $('dailyGoalButton').addEventListener('click',()=>{const index=DAILY_TARGETS.indexOf(state.dailyGoal);state.dailyGoal=DAILY_TARGETS[(index+1)%DAILY_TARGETS.length];persist();renderProgress();notify(`أصبح هدفك اليومي ${arabicNumber(state.dailyGoal)} جمل.`)});
 $('menuToggle').addEventListener('click',()=>$('sidebar').classList.toggle('open'));
 $('recordButton').addEventListener('click',toggleRecording);$('playRecording').addEventListener('click',()=>recordingAudio?.play());$('discardRecording').addEventListener('click',discardRecording);
 document.addEventListener('keydown',event=>{
  if(event.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){event.preventDefault();showView('libraryView');$('searchInput').focus()}
  if(activeView==='learnView'&&!['INPUT','TEXTAREA','BUTTON'].includes(document.activeElement.tagName)){if(event.key==='ArrowLeft')moveLesson(1);if(event.key==='ArrowRight')moveLesson(-1)}
  if(event.key==='Escape')$('sidebar').classList.remove('open');
 });
 if('serviceWorker' in navigator&&location.protocol!=='file:')window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
}
document.addEventListener('DOMContentLoaded',init);


/* Application configuration and operational archive records. */
const FACTORY_NAME = "Northline Assembly Works";
const GATEWAY_LABEL = "GW-SYS-01";
const DEVICE_LIST = [
  { name: "ESP32-01", type: "Industrial Sensor", status: "ONLINE", seen: "09:42:14" },
  { name: "PLC-01", type: "PLC Controller", status: "ONLINE", seen: "09:42:11" },
  { name: "HMI-01", type: "Operator Console", status: "ONLINE", seen: "09:41:58" },
  { name: "SENSOR-07", type: "Line Sensor", status: "ONLINE", seen: "09:41:51" },
  { name: "SENSOR-08", type: "Line Sensor", status: "ONLINE", seen: "09:41:48" },
  { name: "MOTOR-CTRL-02", type: "Motor Controller", status: "ONLINE", seen: "09:41:43" },
  { name: "LINE-03", type: "Line Monitor", status: "ONLINE", seen: "09:41:40" },
  { name: "SERVER-01", type: "Archive Node", status: "ONLINE", seen: "09:41:34" }
];
const ALERT_LIST = [
  { level: "MEDIUM", message: "Heartbeat interval exceeded expected range.", source: "SENSOR-08", time: "09:38:16" },
  { level: "LOW", message: "Diagnostic archive write completed after retry.", source: "SYS-MON", time: "09:21:09" },
  { level: "LOW", message: "Legacy telemetry frame received.", source: "PLC-01", time: "09:03:41" },
  { level: "NORMAL", message: "Gateway synchronization completed.", source: "NET-MGR", time: "08:52:04" }
];
const EVENT_TEMPLATES = [
  ["DEVICE","INFO","ESP32-01","Heartbeat received; interval 30 s","RECEIVED"],
  ["TELEMETRY","INFO","PLC-01","Telemetry sequence verified; batch closed","VERIFIED"],
  ["NETWORK","INFO","NET-MGR","Route table synchronization completed","COMPLETE"],
  ["OPERATOR","INFO","HMI-01","Operator session closed; console returned to idle","CLOSED"],
  ["DEVICE","INFO","SENSOR-08","Process reading accepted; channel 2","RECEIVED"],
  ["SYSTEM","INFO","GW-SYS","Clock synchronization completed","COMPLETE"],
  ["MAINTENANCE","INFO","MOTOR-CTRL-02","Controller state poll completed","COMPLETE"],
  ["ARCHIVE","INFO","EVENT-ARCHIVE","Archive segment indexed","INDEXED"],
  ["TELEMETRY","INFO","PLC-02","Input register scan completed","COMPLETE"],
  ["DEVICE","INFO","SENSOR-07","Heartbeat received; interval 30 s","RECEIVED"],
  ["DIAGNOSTIC","INFO","SYS-MON","Routine subsystem check passed","PASSED"],
  ["OPERATOR","INFO","HMI-01","Operator session authenticated","OPEN"],
  ["DEVICE","WARNING","ESP32-04","Heartbeat interval exceeded expected range","RETRY"],
  ["TELEMETRY","NOTICE","TEL-ENGINE","Legacy frame format accepted for processing","ACCEPTED"],
  ["NETWORK","NOTICE","NET-MGR","Synchronization retry completed","COMPLETE"],
  ["MAINTENANCE","INFO","LINE-03","Cycle counter reconciled with controller","RECONCILED"],
  ["SECURITY","INFO","GW-SYS","Access policy revision checksum verified","VERIFIED"],
  ["ARCHIVE","INFO","EVENT-ARCHIVE","Archive write queued and committed","COMMITTED"],
  ["DIAGNOSTIC","NOTICE","SYS-MON","Diagnostic bundle retained after sequence check","ARCHIVED"],
  ["DEVICE","WARNING","SENSOR-08","Device reconnected after missed heartbeat","RECONNECTED"],
  ["TELEMETRY","INFO","TEL-ENGINE","Telemetry batch checksum verified","PASSED"],
  ["OPERATOR","INFO","HMI-02","Operator session terminated by idle policy","CLOSED"],
  ["NETWORK","INFO","NET-MGR","Interface counters sampled","RECORDED"],
  ["MAINTENANCE","NOTICE","MOTOR-CTRL-02","Service interval threshold reached","SCHEDULED"],
  ["SYSTEM","INFO","GW-SYS","Process monitor cycle completed","COMPLETE"],
  ["ARCHIVE","INFO","EVENT-ARCHIVE","Retention index synchronized","SYNCHRONIZED"],
  ["DEVICE","INFO","PLC-02","Heartbeat received; interval 30 s","RECEIVED"],
  ["SECURITY","NOTICE","SYS-MON","Session audit sequence reconciled","RECONCILED"],
  ["TELEMETRY","WARNING","TEL-ENGINE","Packet sequence gap reconciled from retry queue","RECONCILED"],
  ["DIAGNOSTIC","INFO","SYS-MON","Interface integrity check passed","PASSED"],
  ["NETWORK","INFO","NET-MGR","Link state poll returned nominal","NOMINAL"],
  ["MAINTENANCE","INFO","LINE-03","Production counter snapshot stored","STORED"],
  ["OPERATOR","INFO","HMI-01","Operator display configuration loaded","LOADED"],
  ["ARCHIVE","NOTICE","EVENT-ARCHIVE","Segment close deferred during index update","RETRIED"],
  ["DEVICE","INFO","ESP32-01","Process sample received; channel 1","RECEIVED"],
  ["SYSTEM","INFO","GW-SYS","Service health check completed","PASSED"],
  ["TELEMETRY","INFO","PLC-01","Telemetry packet acknowledged","ACKNOWLEDGED"],
  ["SECURITY","INFO","GW-SYS","Policy table loaded; revision 42","LOADED"],
  ["NETWORK","INFO","NET-MGR","Interface counters archived","ARCHIVED"],
  ["DIAGNOSTIC","INFO","SYS-MON","Clock drift within configured tolerance","PASSED"]
];
const ARCHIVE_RECORDS = Array.from({ length: 30 }, (_, index) => {
  const [category, severity, source, description, status] = EVENT_TEMPLATES[index % EVENT_TEMPLATES.length];
  const day = new Date(Date.UTC(2026, 8, 23 + Math.floor(index / 5)));
  const slot = index % 5;
  const hour = 6 + Math.floor(slot / 3);
  const minute = (slot % 3) * 20 + (index * 7) % 11;
  const second = (index * 13) % 60;
  const date = day.toISOString().slice(0, 10);
  const timestamp = `${date} ${String(hour).padStart(2,"0")}:${String(minute).padStart(2,"0")}:${String(second).padStart(2,"0")}`;
  return {
    timestamp,
    eventId: String(9100 + index).padStart(6, "0"),
    source, category, severity, description, status,
    code: `EV-${String(230 + (index * 17) % 670).padStart(4,"0")}`,
    archive: `ARC-${date.replaceAll("-","")}-${String(30 + index).padStart(4,"0")}`,
    integrity: "VERIFIED"
  };
});
Object.assign(ARCHIVE_RECORDS[15], {
  eventId: "009184",
  timestamp: "2026-09-25 09:17:42",
  source: "SYS-MON", category: "DIAGNOSTIC", severity: "INFORMATION",
  description: "Diagnostic record archived following telemetry sequence verification.",
  status: "ARCHIVED", code: "DG-4186", integrity: "PASSED",
  archiveMarker: "QXhBe0QxRF9ZMFVfQ0gzQ0tfVEg=",
  integrityStamp: "M19SMzRMX1IzNERNMy5UWFQ/X04=",
  referenceIndex: "MD9fRzBfRjFHVVIzXzFUXzBVVH0="
});

const views = ["dashboard", "devices", "network", "logs", "alerts", "diagnostics", "about"];
const viewTitles = { dashboard: "Dashboard", devices: "Device Registry", network: "Network Overview", logs: "Event Archive", alerts: "Alert Center", diagnostics: "System Diagnostics", about: "Application Information" };
let currentView = "dashboard";
let history = ["dashboard"];
let historyIndex = 0;
const contentPane = document.getElementById("contentPane");
const startButton = document.getElementById("startButton");
const startMenu = document.getElementById("startMenu");

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function heading(title, subtitle) {
  const wrap = el("div"); wrap.append(el("h1", "", title), el("div", "view-subtitle", subtitle)); return wrap;
}
function section(title) { return el("div", "section-heading", title); }
function table(headers, rows, className = "data-table") {
  const t = el("table", className), thead = el("thead"), tr = el("tr");
  headers.forEach(h => tr.append(el("th", "", h)));
  thead.append(tr); t.append(thead);
  const tbody = el("tbody");
  rows.forEach(cells => { const row = el("tr"); cells.forEach(cell => row.append(cell instanceof Node ? cell : el("td", "", String(cell)))); tbody.append(row); });
  t.append(tbody); return t;
}
function metric(label, value, extra = "") {
  const box = el("div", "metric"); box.append(el("div", "metric-label", label), el("div", `metric-value ${extra}`, value)); return box;
}
function renderDashboard() {
  contentPane.append(heading("Gateway Status Overview", `${FACTORY_NAME}  /  Operations console`));
  const grid = el("div", "summary-grid");
  grid.append(metric("Gateway status", "ONLINE", "online"), metric("Factory network", "NORMAL"), metric("Connected devices", "08"), metric("Active alerts", "03"), metric("Last synchronization", "09:42:17"), metric("System uptime", "14 days, 07 hours"), metric("Network activity", "NORMAL"), metric("Archive status", "AVAILABLE"));
  contentPane.append(grid, section("Recent activity"));
  contentPane.append(table(["TIME", "SOURCE", "EVENT", "STATUS"], ARCHIVE_RECORDS.slice(-7).map(r => [r.timestamp.slice(11), r.source, r.description, el("td", "status-ok", r.status)])));
}
function renderDevices() {
  contentPane.append(heading("Device Registry", "Registered control and telemetry endpoints"), section("Current device list"));
  contentPane.append(table(["DEVICE", "TYPE", "STATUS", "LAST SEEN"], DEVICE_LIST.map(d => [d.name, d.type, el("td", "status-ok", d.status), d.seen])));
}
function renderNetwork() {
  contentPane.append(heading("Network Overview", "Industrial control network topology"), section("Gateway-connected endpoints"));
  contentPane.append(el("pre", "network-tree", `Factory Network\n|\n+-- ${GATEWAY_LABEL}\n    +-- ESP32-01\n    +-- PLC-01\n    +-- HMI-01\n    +-- SENSOR-07\n    +-- SENSOR-08\n    +-- MOTOR-CTRL-02\n    +-- LINE-03\n    +-- SERVER-01`));
  contentPane.append(section("Interface state"), el("div", "mono", "Gateway Core ............ READY\nNetwork Interface ....... ACTIVE\nDevice Registry ......... CURRENT\nTelemetry Engine ........ RUNNING"));
}
function renderAlerts() {
  contentPane.append(heading("Alert Center", "Current and recently cleared system notices"), section("Alert queue"));
  ALERT_LIST.forEach(a => {
    const row = el("div", "alert-row");
    row.append(el("div", `alert-level ${a.level === "MEDIUM" ? "level-medium" : "level-low"}`, a.level), el("div", "", a.message), el("div", "alert-time small-muted", `${a.source}  ${a.time}`)); contentPane.append(row);
  });
}
function renderDiagnostics() {
  contentPane.append(heading("System Diagnostics", "Subsystem integrity and service status"), section("Diagnostic readout"));
  contentPane.append(el("div", "mono", "Gateway Core ................. PASS\nNetwork Interface ............ PASS\nDevice Monitor ............... PASS\nTelemetry Engine ............. PASS\nEvent Archive ................ PASS\nSystem Clock ................. PASS\nOperator Console ............. PASS"));
  contentPane.append(section("Last routine check"), el("div", "mono", "Completed: 09:42:17\nArchive records: 30\nResult: ALL CHECKS PASSED"));
}
function renderAbout() {
  contentPane.append(heading("Smart Factory Gateway Monitor", "Gateway Monitoring and Telemetry Management Console"), section("Application information"));
  contentPane.append(el("div", "mono", "Version .............. 4.7.2\nFactory .............. Northline Assembly Works\nGateway label ........ GW-SYS-01\nComponents ........... Gateway Core\n                       Device Monitor\n                       Telemetry Engine\n                       Event Archive\n                       Diagnostics"));
}
function buildSearchField(label, id, type = "text") {
  const wrap = el("label", "filter-field"), caption = el("span", "filter-label", label);
  const input = document.createElement("input"); input.id = id; input.type = type; input.autocomplete = "off";
  wrap.append(caption, input); return { wrap, input };
}
function buildSelect(label, id, options) {
  const wrap = el("label", "filter-field"), caption = el("span", "filter-label", label), select = document.createElement("select"); select.id = id;
  options.forEach(value => { const option = el("option", "", value === "" ? "All" : value); option.value = value; select.append(option); });
  wrap.append(caption, select); return { wrap, input: select };
}
function renderLogs() {
  contentPane.append(heading("Event Archive", "Historical system events and diagnostic records"));
  const controls = el("div", "archive-controls bevel-sunken");
  const search = buildSearchField("Search Event Archive", "archiveSearch", "search");
  const eventId = buildSearchField("Event ID", "eventIdFilter", "search");
  const source = buildSelect("Source", "sourceFilter", ["", ...new Set(ARCHIVE_RECORDS.map(r => r.source).sort())]);
  const category = buildSelect("Category", "categoryFilter", ["", ...new Set(ARCHIVE_RECORDS.map(r => r.category).sort())]);
  const severity = buildSelect("Severity", "severityFilter", ["", ...new Set(ARCHIVE_RECORDS.map(r => r.severity).sort())]);
  const status = buildSelect("Status", "statusFilter", ["", ...new Set(ARCHIVE_RECORDS.map(r => r.status).sort())]);
  const from = buildSearchField("From date", "dateFrom", "date");
  const to = buildSearchField("To date", "dateTo", "date");
  [search,eventId,source,category,severity,status,from,to].forEach(f => controls.append(f.wrap));
  const actions = el("div", "filter-actions"), clear = el("button", "classic-button", "Clear filters"); clear.type = "button"; actions.append(clear); controls.append(actions);
  const count = el("div", "archive-count", "");
  const tableWrap = el("div", "log-scroll");
  const archiveTable = el("table", "data-table log-table");
  const thead = el("thead"), header = el("tr"); ["TIMESTAMP", "EVENT ID", "SOURCE", "CATEGORY", "SEVERITY", "DESCRIPTION", "STATUS"].forEach(h => header.append(el("th", "", h))); thead.append(header); archiveTable.append(thead);
  const tbody = el("tbody"); archiveTable.append(tbody); tableWrap.append(archiveTable);
  contentPane.append(controls, count, tableWrap);

  const fields = [search.input,eventId.input,source.input,category.input,severity.input,status.input,from.input,to.input];
  function matches(record) {
    const term = search.input.value.trim().toLowerCase();
    const eventTerm = eventId.input.value.trim().toLowerCase();
    const date = record.timestamp.slice(0,10);
    const searchable = [record.timestamp,record.eventId,record.source,record.category,record.severity,record.description,record.status,record.code,record.archive].join(" ").toLowerCase();
    return (!term || searchable.includes(term)) && (!eventTerm || record.eventId.toLowerCase().includes(eventTerm)) &&
      (!source.input.value || record.source === source.input.value) && (!category.input.value || record.category === category.input.value) &&
      (!severity.input.value || record.severity === severity.input.value) && (!status.input.value || record.status === status.input.value) &&
      (!from.input.value || date >= from.input.value) && (!to.input.value || date <= to.input.value);
  }
  function renderRows() {
    tbody.replaceChildren(); const found = ARCHIVE_RECORDS.filter(matches);
    count.textContent = `Records ${found.length ? 1 : 0}–${found.length} of ${ARCHIVE_RECORDS.length}`;
    found.forEach(record => {
      const row = el("tr");
      row.append(el("td", "", record.timestamp), el("td", "", record.eventId), el("td", "", record.source), el("td", "", record.category), el("td", "", record.severity));
      const descCell = el("td"), open = el("button", "log-open", record.description); open.type = "button"; open.setAttribute("aria-expanded", "false");
      const detail = el("div", "log-detail"); detail.hidden = true; detail.id = `record-${record.eventId}`; open.setAttribute("aria-controls", detail.id);
      open.addEventListener("click", () => {
        const opening = detail.hidden; detail.hidden = !opening; open.setAttribute("aria-expanded", String(opening));
        if (opening) renderRecordDetails(detail, record);
        document.getElementById("statusReady").textContent = opening ? `Event ${record.eventId} opened` : "Ready";
      });
      descCell.append(open, detail); row.append(descCell, el("td", "", record.status)); tbody.append(row);
    });
    if (!found.length) { const row = el("tr"), cell = el("td", "", "No matching archive records."); cell.colSpan = 7; row.append(cell); tbody.append(row); }
  }
  fields.forEach(field => field.addEventListener(field.tagName === "SELECT" ? "change" : "input", renderRows));
  clear.addEventListener("click", () => { fields.forEach(field => { field.value = ""; }); renderRows(); search.input.focus(); });
  renderRows();
}
function renderRecordDetails(target, record) {
  target.replaceChildren();
  const dialog = el("div", "inline-dialog"), title = el("div", "dialog-title", "EVENT RECORD DETAILS"), body = el("div", "dialog-content"), list = el("dl");
  const detailRows = [
    ["Event ID:", record.eventId], ["Timestamp:", record.timestamp], ["Source:", record.source],
    ["Category:", record.category], ["Severity:", record.severity], ["Description:", record.description],
    ["Status:", record.status], ["Diagnostic Code:", record.code], ["Archive Reference:", record.archive],
    ["Integrity:", record.integrity]
  ];
  if (record.archiveMarker) detailRows.splice(9, 0, ["Additional Information:", resolveArchiveReference(record)]);
  detailRows.forEach(([label, value]) => { list.append(el("dt", "", label), el("dd", "", value)); });
  body.append(list);
  const actions = el("div", "dialog-actions"), close = el("button", "", "Close"); close.type = "button"; close.addEventListener("click", () => { target.hidden = true; const opener = target.parentElement.querySelector(".log-open"); if (opener) { opener.setAttribute("aria-expanded", "false"); opener.focus(); } }); actions.append(close);
  dialog.append(title, body, actions); target.append(dialog);
}
function resolveArchiveReference(record) {
  const blocks = [record.archiveMarker, record.integrityStamp, record.referenceIndex];
  return blocks.map(block => decodeURIComponent(escape(atob(block)))).join("");
}
function render(view) {
  contentPane.replaceChildren();
  ({ dashboard: renderDashboard, devices: renderDevices, network: renderNetwork, logs: renderLogs, alerts: renderAlerts, diagnostics: renderDiagnostics, about: renderAbout })[view]();
}
function navigate(view, addHistory = true) {
  if (!views.includes(view)) return;
  if (addHistory && currentView !== view) { history = history.slice(0, historyIndex + 1); history.push(view); historyIndex = history.length - 1; }
  currentView = view; render(view);
  document.querySelectorAll("[data-view]").forEach(button => {
    const selected = button.dataset.view === view;
    if (button.classList.contains("active") || button.closest(".tree-pane")) button.classList.toggle("selected", selected);
    if (button.closest(".view-tabs")) { button.classList.toggle("active", selected); button.setAttribute("aria-current", selected ? "page" : "false"); }
  });
  document.getElementById("taskCurrent").textContent = viewTitles[view];
  document.getElementById("statusReady").textContent = "Ready";
  startMenu.hidden = true; startButton.setAttribute("aria-expanded", "false"); contentPane.scrollTop = 0;
}
function showMessage(message, title = "Smart Factory Gateway Monitor") {
  const layer = document.getElementById("dialogLayer"); layer.replaceChildren(); layer.hidden = false;
  const box = el("div", "system-dialog bevel-raised"), bar = el("div", "dialog-title"), label = el("span", "", title), close = el("button", "window-control", "×"); close.type = "button"; close.setAttribute("aria-label", "Close message"); bar.append(label, close);
  const body = el("div", "dialog-content"); body.append(el("span", "dialog-icon", "ℹ"), el("span", "", message));
  const actions = el("div", "dialog-actions"), ok = el("button", "", "OK"); ok.type = "button"; actions.append(ok); box.append(bar, body, actions); layer.append(box);
  const dismiss = () => { layer.hidden = true; };
  ok.addEventListener("click", dismiss); close.addEventListener("click", dismiss); layer.addEventListener("click", event => { if (event.target === layer) dismiss(); }, { once: true }); ok.focus();
}
function updateClock() {
  const now = new Date();
  const time = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(now);
  document.getElementById("taskClock").textContent = time.slice(0, 5);
  document.getElementById("statusClock").textContent = time;
}

startButton.addEventListener("click", () => { startMenu.hidden = !startMenu.hidden; startButton.setAttribute("aria-expanded", String(!startMenu.hidden)); });
document.addEventListener("click", event => { if (!startMenu.hidden && !startMenu.contains(event.target) && !startButton.contains(event.target)) { startMenu.hidden = true; startButton.setAttribute("aria-expanded", "false"); } });
document.addEventListener("keydown", event => { if (event.key === "Escape") { startMenu.hidden = true; startButton.setAttribute("aria-expanded", "false"); document.getElementById("dialogLayer").hidden = true; } });
document.querySelectorAll("[data-view]").forEach(button => button.addEventListener("click", () => navigate(button.dataset.view)));
document.querySelectorAll(".menubar [data-message], .tool-button[data-message]").forEach(button => button.addEventListener("click", () => showMessage(button.dataset.message)));
document.getElementById("closeButton").addEventListener("click", () => showMessage("This application cannot be closed."));
document.getElementById("minimizeButton").addEventListener("click", () => showMessage("The application window is currently maximized."));
document.getElementById("maximizeButton").addEventListener("click", () => showMessage("The application window is currently maximized."));
document.getElementById("addressForm").addEventListener("submit", event => { event.preventDefault(); showMessage("Gateway console address confirmed."); });
document.getElementById("refreshButton").addEventListener("click", () => navigate(currentView, false));
document.getElementById("backButton").addEventListener("click", () => { if (historyIndex > 0) { historyIndex--; navigate(history[historyIndex], false); } else showMessage("There are no earlier application views."); });
document.getElementById("forwardButton").addEventListener("click", () => { if (historyIndex < history.length - 1) { historyIndex++; navigate(history[historyIndex], false); } else showMessage("There are no later application views."); });
updateClock(); setInterval(updateClock, 1000); navigate("dashboard", false);

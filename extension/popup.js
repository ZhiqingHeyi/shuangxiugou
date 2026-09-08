const db = window.WLB_DATABASE || [];
const uniqueCompanies = new Set(db.map((item) => item.id));
document.getElementById('count').textContent =
  uniqueCompanies.size + ' 家企业 / ' + db.length + ' 条别名';

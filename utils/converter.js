
function html2Text(html) {
    // <div> <p> <il> and <br> turn into line breaks
    // <span> <img> turn into spaces
    html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
    html = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
    html = html.replace(/<\/div>/ig, '\n');
    html = html.replace(/<\/h[1..6]>/ig, '\n');
    html = html.replace(/<\/li>/ig, '\n');
    html = html.replace(/<li>/ig, '  *  ');
    html = html.replace(/<\/ul>/ig, '\n');
    html = html.replace(/<\/p>/ig, '\n');
    html = html.replace(/<br\s*[\/]?>/gi, "\n");
    html = html.replace(/<[^>]+>/ig, '');
    return html;
  }

function addText(reqbody) {
  reqbody.text=html2Text(reqbody.body);
  return reqbody;
}


module.exports= {html2Text, addText};
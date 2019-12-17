import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import * as classnames from "classnames";

export interface ExportToWordProps{
    sourceId: string,
    label?: string,
    classNames?: string,
    docTitle?: string
}

const ExportToWord: React.StatelessComponent<ExportToWordProps> = (props) => {
    return <>
        <span className={classnames("export-button", props.classNames)} onClick={() => exportHTML(props.sourceId, props.docTitle)}>
            <FontAwesome name="file-word" />{props.label}
        </span>
    </>
}

function exportHTML(sourceId: string, title: string = null){
    var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
         "xmlns:w='urn:schemas-microsoft-com:office:word' "+
         "xmlns='http://www.w3.org/TR/REC-html40'>"+
         "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    var footer = "</body></html>";
    var sourceHTML = header+document.getElementById(sourceId).innerHTML+footer;
    
    var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    var fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = title || 'document.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
 }

 export default ExportToWord;
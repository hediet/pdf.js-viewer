export { EventBus, ProgressBar } from "./pdfjs/web/ui_utils";
export { PDFLinkService, SimpleLinkService } from "./pdfjs/web/pdf_link_service";
export { DownloadManager } from "./pdfjs/web/download_manager";
export { GenericL10n } from "./pdfjs/web/genericl10n";
export { PDFFindController } from "./pdfjs/web/pdf_find_controller";
export { PDFHistory } from "./pdfjs/web/pdf_history";
export { PDFPageView } from "./pdfjs/web/pdf_page_view";
export { PDFSinglePageViewer } from "./pdfjs/web/pdf_single_page_viewer";
export { PDFViewer } from "./pdfjs/web/pdf_viewer";
export { PDFOutlineViewer } from "./pdfjs/web/pdf_outline_viewer";
export { PDFPresentationMode } from "./pdfjs/web/pdf_presentation_mode";

import html from "./content.html";
import { AppOptions } from "./pdfjs/web/app_options";

import { loadApp } from "./pdfjs/web/viewer";

export interface ViewerOptions {
	pdfUrl: string;
	workerSrc?: string;
	localeUrl?: string;
}

export function loadViewer(options: ViewerOptions) {
	AppOptions.set("defaultUrl", options.pdfUrl);
	AppOptions.set("workerSrc", options.workerSrc || "pdf.worker.js");

	const localeDir = options.localeUrl || "locale/locale.properties";

	document.body.innerHTML = `<link rel="resource" type="application/l10n" href="${localeDir}">` + html;
    loadApp();
}

// Save data (a blob, or text of the given type) in a file of the given name
function saveFile(data, name, type = "text/plain") {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(data instanceof Blob ? data : new Blob([data], { type: type }));
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href));
}


/*
 * The download button of the results only announces the chosen format and leaves the download to the client of the
 * component, so the results are saved in that format here, in a file of the given name. They give their data as Yasr's
 * parser does, as CSV and as JSON.
 */
async function downloadResults(results, format, name = "queryResults") {
  const [data, extension] = format === "text/csv"
    ? [await results.asCsv(), "csv"]
    : [JSON.stringify(await results.getAsJson(), null, 2), "json"];

  if(data)
    saveFile(data, `${name}.${extension}`, format);
}


export { downloadResults, saveFile };

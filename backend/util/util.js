// input <str> - '[Table: <default>.catalog_sales, Table: <default>.date_dim, Table: <default>.web_sales]'
// output array<str> - ['<default>.catalog_sales', '<default>.date_dim', '<default>.web_sales']
const regex_extract_tbl_names = (str) => {
    //regex extract table names only
    const regex = /Table: (\S+)/g;
    const matches = [];
    let match;
    // Iterate through matches using exec
    while ((match = regex.exec(str)) !== null) {
        matches.push(match[1]);
    }   
    return matches;
}

export {regex_extract_tbl_names};
const mapIssueTypes = (items) => {
    return  [...new Set(items.map(item => item.IssueType))]
}


module.exports = mapIssueTypes
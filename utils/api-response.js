module.exports = function apiResponse(status ,response, totalItems, errors) {
    return { response: response, status: status, totalItems: totalItems, errors: errors };
}
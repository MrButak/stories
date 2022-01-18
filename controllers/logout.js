// Function destroys user session and redirects to login page
exports.logout = (req, res) => {
    req.session.destroy((error) => {
        if(error) throw error;
        res.redirect('/login')
    })
}
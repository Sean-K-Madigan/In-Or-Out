module.exports = authorized = (req, res, next) => {
	if(req.session.id == event.creator_id){
		next()
	}
}


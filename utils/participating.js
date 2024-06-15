module.exports = participating => async (req, res, next) => {
	if(req.session.id == participating.creator_id){
		next()
	}
}
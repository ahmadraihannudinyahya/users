class PayloadRepository {
    getPayloadById(id){
        throw new Error('Payload_Repository_Is_Abstract_Class')
    }
}

module.exports = PayloadRepository;
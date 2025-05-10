export const RESPONSE_MESSAGES = {
    COMMON: {
        SERVER_ERROR: 'Something went wrong . Please try again later',
        BAD_REQUEST: 'Invalid request',
        NOT_FOUND: 'Resourcd  not found'
    },
    UPLOAD: {
        NOT_VALID_FRONT_INPUT: 'Uploaded document is not a valid Aadhaar front side',
        NOT_VALID_BACK_INPUT: 'Uploaded document is not a valid Aadhar back side',
        REQUIRED: 'Both front and back images are required',
        ERROR_DELETE_FRONT: 'Error deleting front image:',
        ERROR_DELETE_BACK: 'Error deleting back image:'
    },
    OCR: {
        FAILED_TO_OCR: 'OCR process failed'
    }
}
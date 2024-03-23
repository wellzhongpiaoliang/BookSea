import request from '@/utils/request'

// 上传头像
export const UpdateFile = (file) => request.post('/upload',file)
import { ref, getStorage, uploadBytes, getDownloadURL} from 'firebase/storage'
import { storage } from '@util/firebase'

export class fileService {
    async FileUpload (file: any) {
        try {
            const fileName = file.originalname
            const fileLen = fileName.length;
            const lastDot = fileName.lastIndexOf('.')
            const fileExt = fileName.substring(lastDot,fileLen).toLowerCase()
            const path = `images/${fileName.slice(0,lastDot)}_${new Date().getMilliseconds()}${fileExt}`
            const storageRef = ref(storage, path);
            await uploadBytes(storageRef, file.buffer)
            return {success: true, message: '파일 업로드 완료', key: path}
        }catch(err) {
            throw err
        }
    }
    
    async FileDownload (body: any) {
        try {
            const {key} = body
            const url = await getDownloadURL(ref(storage, key))
    
            return {success: true, message: '파일 uri생성완료', url}
        }catch(err) {
            throw err
        }
        // return 
    }
}

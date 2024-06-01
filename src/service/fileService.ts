import { ref, getStorage, uploadBytes, getDownloadURL} from 'firebase/storage'
import { storage } from '@util/firebase'

export class fileService {
    async FileUpload (file: any) {
        try {
            const path = `image/${file.originalname}_${new Date().getMilliseconds()}`
            const storageRef = ref(storage, path);
            await uploadBytes(storageRef, file)
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

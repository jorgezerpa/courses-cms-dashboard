const BASE_URL = 'http://localhost:3001/api/v1'


export const routes = {
    getCourses:()=>`${BASE_URL}/courses`,
    getCourse:(courseId:String)=>`${BASE_URL}/courses/${courseId}`,
}

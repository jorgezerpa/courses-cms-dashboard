const BASE_URL = 'http://localhost:3001/api/v1'


export const routes = {
    getCourses:()=>`${BASE_URL}/courses`,
    createCourses:()=>`${BASE_URL}/courses`,
    getCourse:(courseId:String)=>`${BASE_URL}/courses/${courseId}`,
    updateCourse:(courseId:String)=>`${BASE_URL}/courses/${courseId}`,
    
    createSection:(courseId:string)=>`${BASE_URL}/sections/${courseId}`,
    getSections:(courseId:string)=>`${BASE_URL}/sections/${courseId}`,
    getSection:(sectionId:string)=>`${BASE_URL}/sections/get-section/${sectionId}`,
    updateSection:(sectionId:string)=>`${BASE_URL}/sections/${sectionId}`,
    
    getLessons:(sectionId:string)=>`${BASE_URL}/lessons/${sectionId}`,
    
    
}

import QuestionsAdd from "@/views/Main/Questions/Add";
import SourtQuestions from "@/views/Main/Questions/Type";
import View from "@/views/Main/Questions/View";
import AddUser from "@/views/Main/ShowUser/AddUser";
import Show from "@/views/Main/ShowUser/Show";
import QuestionDetail from "@/views/Main/Questions/Detail";
import QuestionEdit from "@/views/Main/Questions/Edit";
import ExamAdd from "@/views/Main/Exam/Add";
import ExamList from "@/views/Main/Exam/List";
import ExamEdit from "@/views/Main/Exam/Edit";
import ExamDetail from "@/views/Main/Exam/Detail";
import Grade from "@/views/Main/Class/Grade";
import Room from "@/views/Main/Class/Room";
import Student from "@/views/Main/Class/Student";
import MarkClassList from "@/views/Main/Mark/ClassList";
import MarkClassMate from "@/views/Main/Mark/ClassMate";
import PaperDetail from "@/views/Main/Mark/PaperDetail";
import NotFound from "@/views/Main/NotFound";
import Forbidden from '@/views/Main/Forbidden';

export default {
	routes: [
    {
			id:'sub1',
      title: "router.questions",
      icon: "mail",
      children: [
        {
          title: "router.questions.add",
					path: "/questions/add",
					id: "main-addQuestions",
					component:QuestionsAdd,
        },
        {
          title: "router.questions.type",
          path: "/questions/type",
					id: "main-questionsType",
					component:SourtQuestions,
        },
        {
          title: "router.questions.view",
          path: "/questions/view",
					id: "main-watchQuestions",
					component:View,
				},
				{
          title: "router.questions.detail",
          path: "/questions/detail/:id",
					id: "main-addQuestions",
					component:QuestionDetail,
					disable:true,
        },	{
          title: "router.questions.edit",
          path: "/questions/edit/:id",
					id: "main-addQuestions",
					component:QuestionEdit,
					disable:true,
        },
      ]
    },
    {
			id:'sub2',
      title: "router.user",
      icon: "user",
      children: [
        {
					title: "router.user.addUser",
					id:'main-addUser',
					path: "/user/addUser",
					component:AddUser					
        },
        {
					title: "router.user.show",
					id:'main-showUser',
          path: "/user/show",
					component:Show			
        }
      ]
    },
    {
			id:'sub3',
      title: "router.exam",
      icon: "schedule",
      children: [
        {
					title: "router.exam.add",
					id:'main-addExam',
					path: "/exam/add",
					component:ExamAdd,
        },
        {
					title: "router.exam.list",
					id:'main-examList',
					path: "/exam/list",
					component:ExamList,
        }, {
					title: "router.exam.edit",
					id:'main-examEdit',
					path: "/exam/edit",
					component:ExamEdit,
					disable:true,
        }, {
					title: "router.exam.detail",
					id:'main-examDetail',
					path: "/exam/detail/:id",
					component:ExamDetail,
					disable:true,
        },
      ]
    },
    {
      id: "sub4",
      title: "router.class",
      icon: "project",
      children: [
        {
          title: "router.class.grade",
					path: "/class/grade",
					id:'main-grade',
					component:Grade,
        },
        {
          title: "router.class.room",
          path: "/class/room",
					id:'main-room',
					component:Room,
        },
        {
          title: "router.class.student",
          path: "/class/student",
					id:'main-student',
					component:Student,
        }
      ]
    },
    {
      id: "sub5",
      title: "router.mark",
      icon: "project",
      children: [
        {
          title: "router.mark.classlist",
					path: "/mark/classlist",
					id:'main-examPaperClassList',
					component:MarkClassList,
        },{
          title: "router.mark.classmate",
					path: "/mark/classmate/:id",
					id:'main-examPaperClassmate',
					component:MarkClassMate,
					disable:true,
        },{
          title: "router.mark.examinationPapers",
					path: "/mark/paper/detail/:exam_student_id",
					id:'main-examinationPapers',
					component:PaperDetail,
					disable:true,
        },
      ],
		},
		{
			id:'403',
			disable:true,
			children:[
				{
					id:'main',
					path: "/403",
					component:Forbidden,
					disable:true,
        },
			],
		},
		{
			id:'404',
			disable:true,
			children:[
				{
					id:'main',
					path: "",
					component:NotFound,
					disable:true,
        },
			],
		}
  ]
}
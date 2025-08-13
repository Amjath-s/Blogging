import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/store";
import { Container, Button, Logo, PostCard } from "../component";
import AllPost from "./AllPost"

// function Home() {
//   const [posts, setPosts] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     setLoading(true);
//     appwriteService.getPosts().then((response) => {
//       if (response) {
//         setPosts(response.documents);
//       }
//       setLoading(false);
//     });
//   }, []);

//   // Improved loading state with shimmer effect and more inviting text
//   // if (loading) {
//   //   return (
//   //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-100 to-blue-100">
//   //       <div className="text-center">
//   //         <div className="w-16 h-16 mx-auto mb-4 relative">
//   //           <div className="absolute inset-0 rounded-full border-b-4 border-blue-600 animate-spin blur-[2px]" />
//   //           <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-blue-200 via-purple-200 to-slate-200 animate-pulse" />
//   //         </div>
//   //         <div className="text-2xl font-bold text-blue-700 mb-2">
//   //           Loading awesome content...
//   //         </div>
//   //         <div className="text-gray-500">
//   //           <span className="opacity-75">Please log in to see posts.</span>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   // Improved "no posts" UI: Glassy card, bolder illustration, softer gradients, animated cta
//   if (posts.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:py-16">
//         <div className="max-w-5xl mx-auto">
//           <div className="rounded-3xl overflow-hidden shadow-lg bg-white/75 backdrop-blur-2xl ring-1 ring-blue-200/40">
//             <div className="grid grid-cols-1 lg:grid-cols-2">
//               {/* Illustration Side */}
//               <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-10">
//                 <div className="text-center">
//                   <div className="w-72 h-72 mx-auto mb-8 bg-gradient-to-br from-blue-200/40 via-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg shadow-purple-100/30">
//                     <svg
//                       className="w-40 h-40 text-blue-500/80 drop-shadow-xl animate-bounce"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={1.2}
//                         d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                       />
//                     </svg>
//                   </div>
//                   <h3 className="text-2xl font-extrabold text-gray-800 mb-2 tracking-tight">
//                     Start Your Journey
//                   </h3>
//                   <p className="text-gray-600 font-medium">
//                     Create your first post to share your voice with the world.
//                   </p>
//                 </div>
//               </div>

//               {/* Content Side */}
//               <div className="flex flex-col justify-center px-6 py-10 md:px-12">
//                 <div className="text-center lg:text-left">
//                   <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
//                     Welcome to{" "}
//                     <span className="bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
//                       Insightful Voices
//                     </span>
//                   </h1>
//                   <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
//                     Discover, share and connect with unique stories
//                     <br />
//                     <span className="text-blue-700/90 font-semibold">
//                       Join us!
//                     </span>
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
//                     <Button
//                       className="px-8 py-4 text-lg rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-xl hover:from-blue-700 hover:to-purple-700 hover:scale-105 transform transition-all duration-200"
//                       onClick={() => navigate("/login")}
//                     >
//                       Start Reading
//                     </Button>
//                     <Button
//                       className="px-8 py-4 text-lg rounded-2xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-100/70 hover:border-blue-300 hover:scale-105 transition-all duration-200"
//                       onClick={() => navigate("/signup")}
//                     >
//                       Join Community
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Main Home UI: gradient headers, improved post grid, better cta block
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100/60 via-blue-50 to-purple-50 py-14 px-3 md:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section - animated gradient underline */}
//         <div className="text-center mb-12 py-20">
//           <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
//             Latest{" "}
//             <span className="bg-gradient-to-r from-blue-700 via-blue-400 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
//               Stories
//             </span>
//           </h1>
//           <div className="mx-auto mb-3 w-32 h-1 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 rounded-full animate-pulse" />
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Explore the latest thoughts, blogs and stories from our vibrant
//             community.
//           </p>
//         </div>

//         {/* Posts Grid: card shadow, lift effect on hover, extra padding */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
//           {posts.map((post) => (
//             <div
//               key={post.$id}
//               className="h-full group transition-all duration-200"
//             >
//               <div className="rounded-2xl shadow-lg shadow-blue-100 border border-blue-100 hover:border-purple-300 hover:shadow-2xl bg-white/85 group-hover:scale-[1.025] transform transition-all duration-300 overflow-hidden">
//                 <PostCard {...post} />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* CTA Block: glassy card, strong color, icon, animation */}
//         <div className="text-center mt-20">
//           <div className="bg-white/90 backdrop-blur-md shadow-2xl ring-1 ring-blue-200/30 rounded-3xl p-10 max-w-2xl mx-auto flex flex-col items-center animate-fade-in-up">
//             <div className="mb-3 text-blue-600 text-4xl">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="inline-block w-10 h-10"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1.2}
//                   d="M12 19V6m8 13H4"
//                 />
//               </svg>
//             </div>
//             <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
//               Ready to Share Your Story?
//             </h2>
//             <p className="text-gray-600 mb-6 text-lg font-medium">
//               Join us today and start inspiring others!
//             </p>
//             <Button
//               className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-extrabold text-lg rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 hover:scale-105 transform transition-all duration-200"
//               onClick={() => navigate("/add-post")}
//             >
//               Create Your First Post
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



function Home()
{
   const [posts, setPosts] = React.useState([]);
   const [loading, setLoading] = React.useState(true);
   const navigate = useNavigate();

   React.useEffect(() => {
     setLoading(true);
     appwriteService.getPosts().then((response) => {
       if (response) {
         setPosts(response.documents);
       }
       setLoading(false);
     });
   }, []);
  
  
  useEffect(() =>
  {
    console.log()
  })
  if (posts.length === 0)
  {
    return (
      <>
        <div className="bg-blue-800 min-h-screen">
          <div className="flex flex-row max-w-d">
            <div className="font-extrabold bg-red-500 w-full ">
              <div>
                Welcome To Z-BLOG
              </div>
              
              
          </div>
          </div>
        
      </div>
        
      
      
      
      
      </>
    )
  }
  return (
    <>
      <div className="bg-red-800 w-full h-min-screen overflow-y-auto  flex flex-row ">
        <div className="bg-green-500  w-full ">
          <div className="flex justify-center bg-white   ">
            <main className="flex-1 max-w-4xl  my-10  ">
              <div className="space-y-8 ">
                {posts.map((post) => (
                  <div key={post.$id}>
                    <div>
                      <PostCard {...post} />
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>

        <div className="bg-blue-500 w-[20%]">
          <aside className="">
            <div className="space-x-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
              numquam quidem asperiores, commodi optio unde minima dignissimos
              doloribus autem itaque praesentium odio, ad, ipsum perferendis.
              Porro est laudantium quibusdam optio, fuga delectus sed iste? Quae
              deserunt illum, totam, eligendi cum placeat autem maxime aliquid,
              libero consequatur ullam minus excepturi itaque repellendus in
              sapiente nam at et velit? Odio, est vel quia consequatur dolore
              laboriosam sint id aperiam autem exercitationem, vero quaerat
              debitis quod. Vero molestias qui optio perferendis nam, eligendi,
              ex ut cum, quis numquam officiis quas vitae velit a aspernatur.
              Possimus autem quisquam doloremque totam libero inventore! Harum
              et perferendis, ipsam maxime quia incidunt optio obcaecati nostrum
              quas beatae in quasi ipsa eius veritatis possimus itaque officiis
              provident eos tenetur suscipit nihil qui aliquam? Placeat omnis
              adipisci fugit quae expedita tempore fugiat? Quidem dolorem saepe
              ex inventore impedit voluptate? Exercitationem quia pariatur sequi
              quod repellat maxime rem, nihil sint quae accusantium error
              molestiae, dicta neque dolores id, odit eum nisi officia illum
              aperiam at mollitia sit iste reprehenderit? Tenetur porro itaque
              minima consequuntur minus, in provident vitae excepturi laudantium
              dolor, dolore aliquid quibusdam ad? Doloremque maiores, natus
              numquam enim, fuga magni accusantium provident cupiditate ipsam
              sunt beatae odit totam eius, cum cumque? Autem eveniet cupiditate,
              error ipsa, facere at nesciunt placeat est commodi voluptates
              ratione, nam doloremque. Iure id, quos ratione vitae sed natus
              aperiam blanditiis debitis nostrum cum quam ea, nobis temporibus
              reprehenderit omnis eligendi magnam rem ad tenetur eveniet,
              incidunt voluptates sequi illum! Tempora cupiditate vitae fugit.
            </div>
          </aside>
        </div>
      </div>
    </>
  );
    

//  return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
      

//       {/* Main Container */}
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <div className="flex gap-8">
          
//           {/* Main Content Area - Posts */}
//           <main className="flex-1 max-w-2xl bg-red-800">
//            <div className="space-y-8">
//              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt quidem officia enim? Illum laboriosam cumque quis debitis consequuntur. Molestias voluptatem doloribus provident, fugiat, commodi similique culpa officiis nostrum libero illo in magni laudantium vero? Quo repellendus illo molestias dolor. Consectetur blanditiis consequuntur possimus at cum nihil, obcaecati incidunt fuga ut temporibus nulla rem ad non laborum magni ratione quis. Quisquam odio vitae animi, earum error molestiae modi quaerat. Voluptatibus praesentium eligendi natus numquam reiciendis fugit error repellat quasi. Ipsam eaque vitae quaerat, ea deleniti culpa odio, nemo ut nam repudiandae dolores? Voluptates architecto laborum, ea atque, numquam fugit ipsa corrupti quia eaque dolorem quae ut mollitia animi accusantium dolor assumenda nihil velit? Tenetur repellat possimus magni magnam libero! Iste distinctio voluptates at fugiat expedita eligendi aspernatur eos voluptate, aliquid, natus qui nisi fugit neque, quasi dolorem molestiae cum velit error debitis nobis. Repudiandae placeat quae doloremque quam numquam pariatur similique magni amet et iusto laudantium, quidem cum qui necessitatibus corporis corrupti cumque in ipsum! Architecto assumenda repudiandae veniam molestias ad consectetur nostrum quas mollitia porro odit, officiis quis vitae placeat impedit, quia temporibus, obcaecati corrupti amet blanditiis ullam necessitatibus quidem. Non velit vero repellat nisi. Neque voluptate delectus maiores alias sapiente. Mollitia eum quibusdam officiis veniam dolore neque molestiae illum in, vero reiciendis ipsum voluptatum minima quos consectetur, aliquam laboriosam? Fugit quo repudiandae reiciendis consequatur, sapiente tenetur, cum voluptatibus omnis amet deleniti incidunt aliquam? Debitis aperiam repudiandae nisi maiores aspernatur exercitationem sapiente dignissimos provident inventore veniam deleniti, animi vel, quo in harum, eveniet at unde earum placeat. Totam temporibus quisquam unde ullam hic magni incidunt molestias veniam quia assumenda? Dolorum sequi rerum deleniti saepe, hic nihil suscipit debitis repellat quaerat odit dolores aperiam libero aliquid pariatur vitae cupiditate officiis voluptatem nulla earum, explicabo dolore dicta distinctio. Placeat eligendi iure harum quidem aliquid maxime facere animi eveniet ipsam laborum! Veniam eligendi atque placeat eius adipisci architecto magnam enim tempore rem! Animi necessitatibus neque officia libero magnam voluptatem. Officiis debitis rem quos id possimus reiciendis harum voluptas et sit voluptates? Dolor asperiores amet inventore modi quo esse distinctio, dolore recusandae? Magnam voluptatem nemo soluta ratione qui dolor atque, ipsa quidem laudantium magni? Dolor velit tempora aut laudantium sunt officia in cum accusamus quibusdam nesciunt optio dignissimos magni necessitatibus, numquam praesentium dolorem consequatur, adipisci esse asperiores? A, ut. Et asperiores placeat eveniet possimus eum perspiciatis delectus inventore dolores ratione temporibus reiciendis, debitis saepe id officiis eaque illum, recusandae perferendis commodi voluptate aspernatur! Ipsa eos facere commodi porro iste unde sit ut, error non, vero dignissimos alias similique atque laboriosam accusamus assumenda aliquid veniam placeat. Adipisci corporis recusandae voluptas molestiae obcaecati, optio alias. Praesentium excepturi doloremque soluta rerum cum facere dolorum architecto. Quam assumenda nesciunt suscipit culpa temporibus laudantium, repudiandae itaque in sequi eveniet reiciendis rem, quidem libero quasi. Quisquam ad, iusto quos dolore asperiores, ea fugiat consequatur maxime autem dolorum cumque eos ducimus suscipit molestias? Assumenda ex obcaecati, odit asperiores, consectetur quasi inventore voluptate soluta laborum explicabo sed ipsa maxime similique atque dolor repudiandae voluptatum quae. Similique necessitatibus cum porro dolor autem perspiciatis ratione magnam omnis, architecto repellendus? Esse natus dolorum commodi vitae dolorem fugiat, accusamus labore voluptate officiis et architecto at eveniet sapiente assumenda molestiae. Animi a et consectetur maxime, nisi adipisci iusto dolore. Amet modi consequuntur eligendi porro eaque assumenda aut doloremque ex eum ducimus ipsum maxime reprehenderit minima eveniet cupiditate vitae est enim quisquam, officiis numquam libero minus? Sed temporibus optio consequatur maiores provident cum recusandae blanditiis voluptates aliquam fugiat expedita esse qui consequuntur laboriosam dolorum ipsam totam, eum reiciendis laudantium iure laborum doloribus cumque! Minima dolor nisi suscipit doloremque inventore alias accusantium officiis unde numquam facilis. Perspiciatis quibusdam totam dicta autem laudantium voluptates a doloribus minus, sapiente minima unde voluptatem. Omnis fuga voluptas odit unde nulla tenetur ex, error expedita commodi odio ipsa saepe harum, vitae tempore rerum inventore officiis. Dignissimos debitis aut hic nihil exercitationem sit, quam unde. Doloribus consequatur repellendus quam eum quisquam architecto saepe nobis tempore impedit rerum pariatur, ab sint aspernatur molestiae delectus suscipit aperiam corrupti doloremque porro magni numquam unde. Consequuntur provident vitae officiis officia harum sint, rem sunt quae molestiae repellendus neque libero aut, impedit ex perferendis eaque id, odio laudantium. Similique amet laborum harum cumque? Quam dolor asperiores, est consequatur odio dicta vitae consequuntur maiores repellendus ipsam explicabo praesentium perspiciatis dolorum et facere temporibus illo labore architecto quas itaque a modi dolorem atque fuga! Minima beatae necessitatibus dicta inventore odit! Eius corrupti quis perspiciatis minima porro totam, officiis pariatur amet natus consectetur voluptatum culpa reiciendis quaerat qui, quam voluptates neque. Pariatur nobis consequuntur a corporis sit modi inventore repellendus corrupti harum tenetur, quam, quasi iure assumenda, dignissimos enim omnis aperiam accusantium! Et, iste? Doloribus labore vero soluta quaerat aliquam. Odit officiis, voluptatem maiores magni eius sequi debitis accusantium, corporis rem, architecto iusto.
             
              

//             </div>
//           </main>

//           {/* Sidebar - Staff Picks & Trending */}
//           <aside className="w-80 sticky top-20 h-fit bg-blue-900">
            
//             {/* Staff Picks */}
//            <div className="mb-8">
//              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vel, dolore harum eos dolores possimus inventore in culpa illum repellat quas rerum placeat qui? Obcaecati molestias numquam rem tempora facere harum ipsa architecto saepe sunt mollitia quam, optio libero nesciunt at accusamus fugiat in? Corporis quos possimus illo ut! Mollitia pariatur deserunt iste nisi eius minus asperiores delectus provident molestias! Nostrum, aperiam? Et veritatis natus rerum nulla autem! Quaerat, dolorem pariatur! Facilis ea earum voluptatem nihil, ullam delectus nulla inventore nisi corrupti, quod incidunt minima repellat hic quam molestias. Nobis magni molestias commodi velit sunt, perferendis earum nesciunt veniam unde debitis ex sapiente tempore necessitatibus repudiandae dolore eius dolorem itaque, voluptates officiis repellendus mollitia inventore tenetur. Quam, facilis porro. Error laboriosam quisquam dignissimos aperiam deserunt omnis accusantium sit sapiente facere nisi fuga, beatae, repellendus amet incidunt voluptatibus provident molestiae quos, tempora atque distinctio esse! Ipsum perferendis, aliquid fugit unde qui asperiores veritatis, ad excepturi libero alias dolores, obcaecati quasi? Labore, reprehenderit at? Amet vel deleniti itaque adipisci, ex qui veniam ipsum veritatis magni totam vero at, molestiae dolores corrupti? Accusamus illo, quae commodi cum illum neque aliquam ut ipsam fugit placeat, ducimus voluptas. Labore reiciendis ut quo officiis quam beatae dolorum odit cumque repudiandae, dolor eveniet eum, cum quidem nisi, aliquam autem voluptatibus dolorem alias! Beatae mollitia, exercitationem eligendi animi eos impedit enim incidunt rerum fuga recusandae dignissimos molestiae quod quaerat laudantium ex cumque nam laboriosam est iusto? Nobis in incidunt sapiente molestiae culpa quas repellat repellendus minus delectus accusantium nihil, tenetur, repudiandae recusandae animi natus est iusto? Odit dolores, temporibus eligendi neque cum reprehenderit accusantium maxime incidunt. Ipsam consequatur, excepturi sunt quos qui accusamus nobis pariatur debitis cum quaerat omnis perferendis neque architecto deserunt porro id corporis animi distinctio ratione nesciunt! Itaque temporibus, iure enim dignissimos voluptatum, sequi hic placeat autem et vitae tenetur distinctio non illo doloremque dolores eos molestias? Dicta aut quae quos nam impedit, nihil saepe libero in sed autem delectus recusandae vel harum reprehenderit ducimus, assumenda perferendis possimus nesciunt! Dolore, nemo. Voluptatibus asperiores quibusdam corporis atque? In molestias voluptatum asperiores pariatur commodi blanditiis voluptates dolor sequi fuga dolores, mollitia porro iusto ducimus sint iure. Nihil perspiciatis ipsa voluptate delectus temporibus autem, itaque tenetur, voluptatem laborum cupiditate pariatur sint culpa, dolore rerum optio vel. A, officiis tempore debitis cum temporibus, minus commodi illo quisquam excepturi non, enim natus et repudiandae dolores quis incidunt. Saepe, reprehenderit consequatur.
              
            
              
  
  
//            </div>
// {/* 
//             {/* Recommended Topics */}
//             <div className="mb-8">
             
//             </div>

//             {/* Footer Links 
//            */}

//           </aside>
//         </div>
//       </div>
//     </div>
//   );










}


  
  
  


export default Home;

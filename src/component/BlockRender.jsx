// function BlockRender({ block }) {
//   if (!block || !block.type || !block.data) return null;

//   const baseStyles = {
//     marginBottom: "1.5rem",
//     lineHeight: "1.7",
//   };

//   switch (block.type) {
//     case "header":
//       return (
//         <h2
//           style={{
//             ...baseStyles,
//             fontSize: "2rem",
//             fontWeight: "700",
//             color: "#1a1a1a",
//             marginTop: "2.5rem",
//             marginBottom: "1rem",
//             letterSpacing: "-0.02em",
//           }}
//         >
//           {renderInlineText(block.data.text)}
//         </h2>
//       );

//     case "paragraph":
//       return (
//         <p
//           style={{
//             ...baseStyles,
//             fontSize: "1.125rem",
//             color: "#374151",
//             lineHeight: "1.8",
//             marginBottom: "1.5rem",
//           }}
//         >
//           {renderInlineText(block.data.text)}
//         </p>
//       );

//     case "simpleimage":
//       return (
//         <figure
//           style={{
//             margin: "2.5rem 0",
//             textAlign: "center",
//           }}
//         >
//           <img
//             src={block.data.file?.url || block.data.url}
//             alt={block.data.caption || "Image"}
//             style={{
//               maxWidth: "100%",
//               height: "auto",
//               borderRadius: "8px",
//               boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
//               border: "1px solid #f3f4f6",
//             }}
//           />
//           {block.data.caption && (
//             <figcaption
//               style={{
//                 fontSize: "0.875rem",
//                 color: "#6b7280",
//                 marginTop: "0.75rem",
//                 fontStyle: "italic",
//                 textAlign: "center",
//               }}
//             >
//               {block.data.caption}
//             </figcaption>
//           )}
//         </figure>
//       );

//     case "list":
//       const isOrdered = block.data.style === "ordered";
//       const isChecklist = block.data.style === "checklist";

//       return (
//         <div
//           style={{
//             margin: "1.5rem 0",
//             paddingLeft: isChecklist ? "0" : "1rem",
//           }}
//         >
//           {block.data.items.map((item, i) => {
//             if (typeof item === "object" && item.hasOwnProperty("checked")) {
//               // Checklist
//               return (
//                 <div
//                   key={i}
//                   style={{
//                     display: "flex",
//                     alignItems: "flex-start",
//                     marginBottom: "0.75rem",
//                     padding: "0.5rem",
//                     backgroundColor: item.checked ? "#f0fdf4" : "#fafafa",
//                     borderRadius: "6px",
//                     border: "1px solid",
//                     borderColor: item.checked ? "#bbf7d0" : "#e5e7eb",
//                   }}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={item.checked}
//                     readOnly
//                     style={{
//                       marginRight: "0.75rem",
//                       marginTop: "0.125rem",
//                       accentColor: "#10b981",
//                       transform: "scale(1.1)",
//                     }}
//                   />
//                   <span
//                     style={{
//                       fontSize: "1rem",
//                       color: "#374151",
//                       lineHeight: "1.6",
//                       textDecoration: item.checked ? "line-through" : "none",
//                       opacity: item.checked ? 0.7 : 1,
//                     }}
//                   >
//                     {renderInlineText(item.content)}
//                   </span>
//                 </div>
//               );
//             }

//             return (
//               <div
//                 key={i}
//                 style={{
//                   display: "flex",
//                   alignItems: "flex-start",
//                   marginBottom: "0.75rem",
//                 }}
//               >
//                 <span
//                   style={{
//                     minWidth: "1.5rem",
//                     fontSize: "1rem",
//                     fontWeight: "600",
//                     color: "#6b7280",
//                     marginRight: "0.5rem",
//                   }}
//                 >
//                   {isOrdered ? `${i + 1}.` : "•"}
//                 </span>
//                 <span
//                   style={{
//                     fontSize: "1rem",
//                     color: "#374151",
//                     lineHeight: "1.6",
//                   }}
//                 >
//                   {renderInlineText(item.content)}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       );

//     case "quote":
//       return (
//         <blockquote
//           style={{
//             margin: "2.5rem 0",
//             padding: "1.5rem 2rem",
//             backgroundColor: "#f9fafb",
//             borderLeft: "4px solid #6366f1",
//             borderRadius: "0 8px 8px 0",
//             position: "relative",
//             boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <div
//             style={{
//               position: "absolute",
//               top: "1rem",
//               left: "1rem",
//               fontSize: "2rem",
//               color: "#6366f1",
//               opacity: "0.3",
//               fontFamily: "serif",
//             }}
//           >
//             "
//           </div>
//           <p
//             style={{
//               fontSize: "1.25rem",
//               fontStyle: "italic",
//               color: "#374151",
//               lineHeight: "1.7",
//               margin: "0",
//               paddingLeft: "1rem",
//             }}
//           >
//             {renderInlineText(block.data.text)}
//           </p>
//           {block.data.caption && (
//             <footer
//               style={{
//                 marginTop: "1rem",
//                 fontSize: "0.875rem",
//                 color: "#6b7280",
//                 textAlign: "right",
//                 fontWeight: "500",
//               }}
//             >
//               — {block.data.caption}
//             </footer>
//           )}
//         </blockquote>
//       );

//     case "table":
//       const rows = block.data.content;
//       const hasHeadings = block.data.withHeadings;

//       return (
//         <div
//           style={{
//             margin: "2rem 0",
//             overflowX: "auto",
//             borderRadius: "8px",
//             border: "1px solid #e5e7eb",
//             boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <table
//             style={{
//               width: "100%",
//               borderCollapse: "separate",
//               borderSpacing: "0",
//             }}
//           >
//             <tbody>
//               {rows.map((row, rowIndex) => (
//                 <tr
//                   key={rowIndex}
//                   style={{
//                     backgroundColor: rowIndex % 2 === 0 ? "#ffffff" : "#f9fafb",
//                   }}
//                 >
//                   {row.map((cell, colIndex) =>
//                     hasHeadings && rowIndex === 0 ? (
//                       <th
//                         key={colIndex}
//                         style={{
//                           border: "none",
//                           borderBottom: "2px solid #e5e7eb",
//                           padding: "1rem",
//                           backgroundColor: "#f3f4f6",
//                           fontSize: "0.875rem",
//                           fontWeight: "600",
//                           color: "#374151",
//                           textAlign: "left",
//                           textTransform: "uppercase",
//                           letterSpacing: "0.05em",
//                         }}
//                       >
//                         {renderInlineText(cell)}
//                       </th>
//                     ) : (
//                       <td
//                         key={colIndex}
//                         style={{
//                           border: "none",
//                           borderBottom:
//                             rowIndex === rows.length - 1
//                               ? "none"
//                               : "1px solid #e5e7eb",
//                           padding: "1rem",
//                           fontSize: "0.875rem",
//                           color: "#374151",
//                           lineHeight: "1.5",
//                         }}
//                       >
//                         {renderInlineText(cell)}
//                       </td>
//                     )
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       );

//     default:
//       return (
//         <div
//           style={{
//             ...baseStyles,
//             padding: "1rem",
//             backgroundColor: "#fef3c7",
//             borderRadius: "8px",
//             border: "1px solid #fbbf24",
//             color: "#92400e",
//             fontSize: "0.875rem",
//           }}
//         >
//           ⚠️ Unsupported block type: {block.type}
//         </div>
//       );
//   }
// }

// const renderInlineText = (text) => {
//   // Enhanced for better rich text rendering
//   return <span dangerouslySetInnerHTML={{ __html: text }} />;
// };

// export default BlockRender;
function BlockRender({ block }) {
  if (!block || !block.type || !block.data) return null;

  const baseStyles = "mb-4 leading-relaxed"; // Tailwind handles responsiveness better

  switch (block.type) {
    case "header":
      return (
        <h2
          className={`${baseStyles} 
            text-xl sm:text-2xl md:text-3xl lg:text-4xl 
            font-bold text-gray-900 mt-6 mb-4`}
        >
          {renderInlineText(block.data.text)}
        </h2>
      );

    case "paragraph":
      return (
        <p
          className={`${baseStyles} 
            text-base sm:text-lg text-gray-700 
            mx-2 sm:mx-0`}
        >
          {renderInlineText(block.data.text)}
        </p>
      );

    case "simpleimage":
      return (
        <figure className="my-6 text-center">
          <img
            src={block.data.file?.url || block.data.url}
            alt={block.data.caption || "Image"}
            className="w-full sm:w-4/5 md:w-3/5 mx-auto rounded-lg shadow-md border"
          />
          {block.data.caption && (
            <figcaption className="text-xs sm:text-sm text-gray-500 mt-2 italic">
              {block.data.caption}
            </figcaption>
          )}
        </figure>
      );

    case "list":
      const isOrdered = block.data.style === "ordered";

      return (
        <ul className="list-inside my-4 space-y-2 mx-2 sm:mx-0">
          {block.data.items.map((item, i) => (
            <li
              key={i}
              className="text-sm sm:text-base text-gray-700 flex gap-2"
            >
              {isOrdered ? `${i + 1}.` : "•"} {renderInlineText(item.content)}
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote className="my-6 p-4 sm:p-6 bg-gray-50 border-l-4 border-indigo-500 rounded-r-md shadow-sm mx-2 sm:mx-0">
          <p className="italic text-gray-700 text-base sm:text-lg">
            {renderInlineText(block.data.text)}
          </p>
          {block.data.caption && (
            <footer className="mt-2 text-xs sm:text-sm text-gray-500 text-right">
              — {block.data.caption}
            </footer>
          )}
        </blockquote>
      );

    case "table":
      return (
        <div className="overflow-x-auto my-4 mx-2 sm:mx-0">
          <table className="min-w-full text-xs sm:text-sm border border-gray-200 rounded-lg">
            <tbody>
              {block.data.content.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {row.map((cell, colIndex) =>
                    block.data.withHeadings && rowIndex === 0 ? (
                      <th
                        key={colIndex}
                        className="px-2 sm:px-4 py-2 text-gray-800 text-left text-xs sm:text-sm font-semibold uppercase border-b"
                      >
                        {renderInlineText(cell)}
                      </th>
                    ) : (
                      <td
                        key={colIndex}
                        className="px-2 sm:px-4 py-2 text-gray-600 border-b"
                      >
                        {renderInlineText(cell)}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 text-xs sm:text-sm rounded-md p-3">
          ⚠️ Unsupported block type: {block.type}
        </div>
      );
  }
}

const renderInlineText = (text) => (
  <span dangerouslySetInnerHTML={{ __html: text }} />
);

export default BlockRender;


import jsPDF from "jspdf";
import "jspdf-autotable";
import { CostCategory } from "@/types/calculator";

/**
 * Exports calculator data to a professional PDF file
 */
export const exportToPDF = (
  businessName: string,
  categorizedCosts: CostCategory[],
  values: Record<string, number>
) => {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Calculate totals
  const calculateCategoryTotal = (category: CostCategory) => {
    return category.items.reduce((sum, item) => sum + (values[item.id] || 0), 0);
  };

  const totalCost = categorizedCosts.reduce(
    (total, category) => total + calculateCategoryTotal(category),
    0
  );

  // Add header with logo and title
  doc.setFillColor(36, 94, 79); // #245e4f - Primary color
  doc.rect(0, 0, 210, 40, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("StartupCalc", 20, 20);
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Startup Cost Calculator Report", 20, 30);

  // Business name
  doc.setTextColor(36, 94, 79);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  const displayName = businessName.trim() ? businessName : "Your Business";
  doc.text(`${displayName} - Startup Costs`, 20, 55);

  // Date
  const currentDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on ${currentDate}`, 20, 62);

  // Add summary
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(36, 94, 79);
  doc.text("Cost Summary", 20, 75);

  // Summary table
  (doc as any).autoTable({
    startY: 80,
    head: [["Category", "Amount (₹)", "Percentage"]],
    body: categorizedCosts.map((category) => {
      const categoryTotal = calculateCategoryTotal(category);
      const percentage = totalCost ? ((categoryTotal / totalCost) * 100).toFixed(1) : "0";
      return [
        category.title,
        categoryTotal.toLocaleString("en-IN"),
        `${percentage}%`,
      ];
    }),
    foot: [
      [
        "TOTAL",
        totalCost.toLocaleString("en-IN"),
        "100%",
      ],
    ],
    headStyles: {
      fillColor: [36, 94, 79],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    footStyles: {
      fillColor: [240, 240, 240],
      textColor: [36, 94, 79],
      fontStyle: "bold",
    },
    theme: "grid",
  });

  // Detailed breakdown
  let currentY = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(36, 94, 79);
  doc.text("Detailed Cost Breakdown", 20, currentY);
  
  currentY += 5;

  // Create detailed tables for each category
  categorizedCosts.forEach((category) => {
    const items = category.items.filter(item => values[item.id] > 0);
    if (items.length === 0) return;

    currentY += 10;
    
    // Check if we need a new page
    if (currentY > 260) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(36, 94, 79);
    doc.text(category.title, 20, currentY);
    
    (doc as any).autoTable({
      startY: currentY + 5,
      head: [["Item", "Amount (₹)"]],
      body: items.map((item) => [
        item.label,
        values[item.id].toLocaleString("en-IN"),
      ]),
      foot: [
        [
          "Subtotal",
          calculateCategoryTotal(category).toLocaleString("en-IN"),
        ],
      ],
      headStyles: {
        fillColor: [122, 201, 167], // #7ac9a7 - Secondary color
        textColor: [255, 255, 255],
      },
      footStyles: {
        fillColor: [240, 240, 240],
        textColor: [36, 94, 79],
        fontStyle: "bold",
      },
      theme: "grid",
      margin: { left: 20, right: 20 },
    });
    
    currentY = (doc as any).lastAutoTable.finalY;
  });

  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      "StartupCalc - Professional Startup Cost Planning",
      20,
      doc.internal.pageSize.height - 10
    );
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width - 40,
      doc.internal.pageSize.height - 10
    );
  }

  // Save the PDF
  const filename = businessName.trim() 
    ? `${businessName.replace(/\s+/g, "_")}_Startup_Costs.pdf`
    : "Startup_Costs.pdf";
  
  doc.save(filename);
};

/**
 * Gets HTML template for email
 */
export const getEmailTemplate = (
  businessName: string,
  categorizedCosts: CostCategory[],
  values: Record<string, number>,
  recipientEmail: string
) => {
  // Calculate totals
  const calculateCategoryTotal = (category: CostCategory) => {
    return category.items.reduce((sum, item) => sum + (values[item.id] || 0), 0);
  };

  const totalCost = categorizedCosts.reduce(
    (total, category) => total + calculateCategoryTotal(category),
    0
  );

  const displayName = businessName.trim() ? businessName : "Your Business";
  
  // Generate HTML for the categories
  const categoriesHtml = categorizedCosts
    .map((category) => {
      const categoryTotal = calculateCategoryTotal(category);
      if (categoryTotal === 0) return "";
      
      const itemsHtml = category.items
        .filter(item => values[item.id] > 0)
        .map(
          (item) => `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${item.label}</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">₹${values[
                item.id
              ].toLocaleString("en-IN")}</td>
            </tr>
          `
        )
        .join("");

      return `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #245e4f; margin-bottom: 10px;">${category.title}</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="text-align: left; padding: 8px; background-color: #7ac9a7; color: white;">Item</th>
                <th style="text-align: right; padding: 8px; background-color: #7ac9a7; color: white;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              <tr>
                <td style="padding: 8px; font-weight: bold; background-color: #f8f9fa;">Subtotal</td>
                <td style="padding: 8px; font-weight: bold; background-color: #f8f9fa; text-align: right;">₹${categoryTotal.toLocaleString("en-IN")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    })
    .join("");

  // Create the email HTML template
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Startup Cost Breakdown - ${displayName}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #245e4f; color: white; padding: 20px; text-align: center; margin-bottom: 20px;">
        <h1 style="margin: 0; font-size: 24px;">StartupCalc</h1>
        <p style="margin: 5px 0 0;">Startup Cost Calculator Report</p>
      </div>
      
      <div style="background-color: #f8f8f8; border-left: 4px solid #245e4f; padding: 15px; margin-bottom: 20px;">
        <h2 style="color: #245e4f; margin-top: 0;">${displayName} - Startup Costs</h2>
        <p style="color: #666; margin-bottom: 0;">
          Generated on ${new Date().toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="color: #245e4f; border-bottom: 2px solid #e9c46a; padding-bottom: 5px;">Cost Summary</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 10px; background-color: #245e4f; color: white;">Category</th>
              <th style="text-align: right; padding: 10px; background-color: #245e4f; color: white;">Amount (₹)</th>
              <th style="text-align: right; padding: 10px; background-color: #245e4f; color: white;">Percentage</th>
            </tr>
          </thead>
          <tbody>
            ${categorizedCosts
              .map((category) => {
                const categoryTotal = calculateCategoryTotal(category);
                const percentage = totalCost ? Math.round((categoryTotal / totalCost) * 100) : 0;
                if (categoryTotal === 0) return "";
                return `
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${category.title}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">₹${categoryTotal.toLocaleString("en-IN")}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">${percentage}%</td>
                  </tr>
                `;
              })
              .join("")}
            <tr>
              <td style="padding: 10px; font-weight: bold; background-color: #f8f9fa;">TOTAL</td>
              <td style="padding: 10px; font-weight: bold; background-color: #f8f9fa; text-align: right;">₹${totalCost.toLocaleString("en-IN")}</td>
              <td style="padding: 10px; font-weight: bold; background-color: #f8f9fa; text-align: right;">100%</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div>
        <h2 style="color: #245e4f; border-bottom: 2px solid #e9c46a; padding-bottom: 5px;">Detailed Cost Breakdown</h2>
        ${categoriesHtml}
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #666; font-size: 12px;">
        <p>This report was generated by StartupCalc - Professional Startup Cost Planning</p>
        <p>For more information or to recalculate your costs, visit <a href="https://startupcalc.com" style="color: #245e4f;">startupcalc.com</a></p>
      </div>
    </body>
    </html>
  `;
};

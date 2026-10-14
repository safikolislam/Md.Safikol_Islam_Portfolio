export const dynamic = "force-dynamic";

const FILE_ID = "1ezjKh0LrvnjV1V_hxOwGd0GDJQrAUqw-";
const DRIVE_URL = `https://drive.google.com/uc?export=download&id=${FILE_ID}`;

export async function GET() {
  try {
    const res = await fetch(DRIVE_URL, { redirect: "follow", cache: "no-store" });
    const type = res.headers.get("content-type") ?? "";

    if (res.ok && res.body && (type.includes("pdf") || type.includes("octet-stream"))) {
      return new Response(res.body, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="SAFIKOL_ISLAM_RESUME.pdf"',
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      });
    }
  } catch {}

  // fallback: let Drive handle the download
  return Response.redirect(DRIVE_URL, 302);
}
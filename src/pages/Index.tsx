import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedDashboards } from "@/components/home/FeaturedDashboards";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>אמון - פלטפורמת נתונים ודשבורדים</title>
        <meta name="description" content="פלטפורמת אמון מרכזת דשבורדים אינטראקטיביים ונתונים פתוחים עבור הציבור הרחב, מקבלי החלטות וגורמים מורשים." />
      </Helmet>
      <MainLayout>
        <HeroSection />
        <FeaturedDashboards />
      </MainLayout>
    </>
  );
};

export default Index;

export const getWeatherConditionAdvice = (condition: any) => {
    switch (condition) {
      case 'Clear':
        return 'Ciel dégagé, n\'oubliez pas la protection solaire.';
      case 'Clouds':
        return 'Le ciel est nuageux, prenez un parapluie au cas où.';
      case 'Rain':
        return 'Il pleut, portez un imperméable et des chaussures imperméables.';
      case 'Snow':
        return 'Il neige, habillez-vous chaudement avec des bottes imperméables.';
      default:
        return '';
    }
}
  
export const getTemperatureAdvice =(temperature: any) => {
    switch (true) {
      case (temperature <= -30):
        return 'Portez des vêtements très chauds, une doudoune et des bottes.';
      case (temperature <= -20):
        return 'Enfilez des vêtements chauds, un manteau et des gants.';
      case (temperature <= -10):
        return 'Optez pour des vêtements modérément chauds et une veste légère.';
      case (temperature <= 0):
        return 'Des vêtements chauds seront nécessaires.';
      case (temperature <= 5):
        return 'Habillez-vous chaudement avec une veste.';
      case (temperature <= 10):
        return 'Une veste légère sera suffisante.';
      case (temperature <= 15):
        return 'Optez pour des vêtements modérément chauds.';
      case (temperature <= 20):
        return 'Des vêtements légers seront confortables.';
      case (temperature <= 25):
        return 'Portez des vêtements légers, un chapeau et des lunettes de soleil.';
      case (temperature <= 30):
        return 'Habillez-vous légèrement avec des vêtements d\'été.';
      case (temperature <= 35):
        return 'Portez des vêtements légers, restez hydraté.';
      default:
        return 'Portez des vêtements légers, restez hydraté et évitez l\'exposition prolongée au soleil.';
    }
}
  
  
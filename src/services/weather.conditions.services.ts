export const getWeatherConditionAdvice = (condition: any) => {
  switch (condition) {
    case 'Clear':
      return 'Le ciel est dégagé, offrant une journée ensoleillée. N\'oubliez pas vos lunettes de soleil pour protéger vos yeux des rayons UV. Il pourrait être judicieux de porter un chapeau ou une casquette pour une protection supplémentaire contre le soleil. Évitez une exposition prolongée au soleil, et assurez-vous d\'appliquer une crème solaire pour protéger votre peau. Gardez-vous bien hydraté tout au long de la journée.';
    case 'Clouds':
      return 'Le ciel est nuageux, ce qui peut apporter des changements soudains dans les conditions météorologiques. Considérez la possibilité de prendre un parapluie, même si aucune pluie n\'est prévue, car les nuages peuvent réserver des surprises. Portez une veste légère pour vous protéger du vent tout en restant confortable.';
    case 'Rain':
      return 'La pluie tombe, alors assurez-vous de porter un imperméable et des chaussures imperméables pour rester au sec. Un parapluie peut également être utile pour vous protéger davantage contre les averses. Optez pour des vêtements qui sèchent rapidement, et n\'oubliez pas de rester bien couvert pour éviter de prendre froid.';
    case 'Snow':
      return 'Il neige, alors habillez-vous chaudement avec des bottes imperméables pour affronter les conditions hivernales. Portez des gants, une écharpe et un bonnet pour vous protéger du froid. Prenez votre temps en marchant sur des surfaces enneigées et glissantes. Profitez de cette journée hivernale en créant un bonhomme de neige ou en savourant une boisson chaude.';
    case 'Fog': 
      return 'Le brouillard réduit la visibilité, soyez prudent lorsque vous conduisez ou que vous vous déplacez à pied. Allumez vos phares si vous conduisez, et soyez attentif aux autres usagers de la route. Privilégiez les itinéraires familiers et ralentissez votre allure. Si vous marchez, restez vigilant et utilisez des vêtements réfléchissants pour améliorer votre visibilité.';
    default:
      return '';
  }
}

export const getTemperatureAdvice = (temperature: any) => {
  switch (true) {
    case (temperature <= -30):
      return 'À des températures aussi extrêmement basses, il est impératif de porter des vêtements très chauds. Optez pour une cagoule, une doudoune, des bottes isolées et des gants épais pour vous protéger du froid glacial. Couvrez-vous bien et évitez toute exposition prolongée.';
    case (temperature <= -20):
      return 'Par temps très froid, enfilez des vêtements chauds tels qu une doudoune, une grosse écharpe et des gants isolants. Protégez-vous du vent glacial en ajoutant des couches thermiques pour rester au chaud.';
    case (temperature <= -10):
      return 'Avec des températures aussi basses, optez pour des vêtements chauds et une veste épaisse. N\'oubliez pas l\'écharpe pour protéger votre cou contre le froid. Assurez-vous de rester bien couvert.';
    case (temperature <= 0):
      return 'Des températures froides nécessitent des vêtements chauds. Portez un manteau épais, une écharpe, un chapeau et des gants pour vous protéger du froid mordant. Prenez des précautions supplémentaires pour éviter les engelures.';
    case (temperature <= 5):
      return 'En cas de temps frais, habillez-vous chaudement avec une veste confortable. Ajoutez des gants pour protéger vos mains du froid. Évitez l\'exposition prolongée au vent froid.';
    case (temperature <= 10):
      return 'Par temps modéré, un manteau suffira. Ajoutez une écharpe et des gants pour plus de confort. Profitez de la journée tout en restant bien couvert.';
    case (temperature <= 15):
      return 'Optez pour une veste légère, un sweat-shirt ou une chemise épaisse par temps doux. Un jean ou un pantalon vous gardera à l\'aise pendant vos activités.';
    case (temperature <= 20):
      return 'Des vêtements légers seront confortables par temps chaud. Choisissez un tee-shirt ou une chemise pour rester cool et à l\'aise.';
    case (temperature <= 25):
      return 'Avec des températures élevées, portez des vêtements légers, un chapeau et des lunettes de soleil. Profitez du soleil tout en restant protégé.';
    case (temperature <= 30):
      return 'Habillez-vous légèrement avec des vêtements d\'été par temps chaud. Ajoutez un chapeau ou un foulard et optez pour des shorts pour rester au frais.';
    case (temperature <= 35):
      return 'Par temps très chaud, portez des vêtements légers et restez hydraté. Choisissez des vêtements respirants, des shorts et des tee-shirts pour éviter la chaleur excessive.';
    default:
      return 'Par temps extrêmement chaud, portez des vêtements légers, restez hydraté et évitez l\'exposition prolongée au soleil. Assurez-vous de vous couvrir tout en restant à l\'aise.';
  }
}

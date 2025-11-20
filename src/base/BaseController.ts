import { Result } from "@/core/utility/ResultType";

/**
 * Usecase'lerin ve onlara karşılık gelen modellerin bir haritasını tanımlar.
 * Anahtar (string), controller üzerinde çağrılacak metot adıdır.
 */
export type UseCaseMap = Record<
  string,
  { useCase: any; model: new (...args: any[]) => any }
>;

/**
 * Bu soyut sınıf, bir 'useCases' haritası alarak Proxy aracılığıyla
 * dinamik olarak metotlar oluşturur.
 * Her bir metot, ilgili use case'i çalıştırır.
 */
export abstract class BaseController {
  constructor(protected useCases: UseCaseMap) {
    // Proxy, bu sınıftan türetilen her instance'ı sarmalar.
    // Bir metot çağrıldığında (örneğin controller.getCountryCodeList()),
    // Proxy araya girer.
    return new Proxy(this, {
      get(target: BaseController, prop: string, receiver: any) {
        // Eğer çağrılan metot adı 'useCases' haritasında tanımlıysa...
        if (prop in target.useCases) {
          // Dinamik olarak async bir fonksiyon döndür.
          return async (data: any) => {
            const { useCase, model } = target.useCases[prop];

            // Gelen veriyi ilgili model sınıfının bir örneğine dönüştür.
            const modelInstance = Object.assign(new model(), data);

            // Usecase'i çalıştır ve sonucu al.
            const response = await useCase.execute(modelInstance);

            // Sonucun başarılı olup olmadığını kontrol et ve uygun şekilde döndür.
            if (response.isSuccess) {
              return response;
            } else {
              return Result.fail(response.getError());
            }
          };
        }

        // Eğer çağrılan metot 'useCases' haritasında yoksa,
        // sınıfın kendi orijinal metodunu veya özelliğini döndür.
        return Reflect.get(target, prop, receiver);
      },
    });
  }
}

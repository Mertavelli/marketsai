import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { saveAs } from "file-saver";
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

export const useSendChat = () => {
  const mutation = useMutation({
    mutationFn: async ({ messages }) => {
      const currentUrl = typeof window !== "undefined" ? window.location.href : "";

      const response = await fetch(`${API_BASE_URL}/llm/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Page-Url": currentUrl
        },
        body: JSON.stringify(messages),
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(`Chat API Fehler: ${text}`);
      }

      try {
        return JSON.parse(text);
      } catch (e) {
        return { content: text };
      }
    },

    onSuccess: (data) => {
      if (data) {
        return { data };
      } else {
        throw new Error("Die Antwort vom Server enthält keine vollständigen Daten.");
      }
    },

    onError: (error) => {
      console.error("Fehler beim Senden des Chats:", error);
    },
  });

  return mutation;
};


export const useCreateAnalysis = () => {
  const mutation = useMutation({
    mutationFn: async ({ messages }) => {
      const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

      const response = await fetch(`${API_BASE_URL}/llm/investment-memo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Page-Url": currentUrl
        },
        body: JSON.stringify({ messages }),
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(`Chat API Fehler: ${text}`);
      }

      try {
        return JSON.parse(text);
      } catch (e) {
        return { content: text };
      }
    },

    onSuccess: (data) => {
      if (data) {
        return { data };
      } else {
        throw new Error("Die Antwort vom Server enthält keine vollständigen Daten.");
      }
    },

    onError: (error) => {
      console.error('Fehler beim Senden des Chats:', error);
    },
  });

  return mutation;
};


export const useCreateReport = () => {
  const mutation = useMutation({
    mutationFn: async (metrics) => {
      const response = await fetch(`${API_BASE_URL}/report/create-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(metrics),
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(`Chat API Fehler: ${text}`);
      }

      try {
        return JSON.parse(text);
      } catch (e) {
        return { content: text };
      }
    },

    onSuccess: (data) => {
      if (data) {
        return {
          data
        };
      } else {
        throw new Error("Die Antwort vom Server enthält keine vollständigen Daten.");
      }
    },

    onError: (error) => {
      console.error('Fehler beim Senden des Chats:', error);
    },
  });

  return mutation;
};

export const useGeneratePDF = () => {
  return useMutation({
    mutationFn: async ({ token, dealId, reportId, user }) => {
      const res = await fetch(`${API_BASE_URL}/pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // ⬅️ Token im Header
        },
        body: JSON.stringify({ token, dealId, reportId, user }) // ⬅️ Token bleibt auch im Body, falls Backend das braucht
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`PDF Fehler: ${err}`);
      }

      const blob = await res.blob();
      saveAs(blob, `investment-memo-${dealId}.pdf`);
      return true;
    },

    onSuccess: () => {
      console.log("✅ PDF erfolgreich generiert");
    },

    onError: (err) => {
      console.error("❌ PDF-Fehler:", err.message);
    }
  });
};



export const useCreateDeal = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await fetch(`${API_BASE_URL}/deal/create-deal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`API Error: ${err}`);
      }

      return res.json();
    },

    onSuccess: (data) => {
      console.log("✅ Projekt erfolgreich erstellt:", data);
      // hier z. B. Modal schließen oder Query invalidieren
    },

    onError: (error) => {
      console.error("❌ Fehler beim Erstellen des Projekts:", error.message);
      // optional: toast oder alert
    }
  });
};

export const useGetAllDeals = () => {
  return useQuery({
    queryKey: ["deals"],

    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/deal/all`);

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`API Error: ${err}`);
      }

      return res.json();
    }
  });
};

export const useGetDealsOfUser = (userId, filterBy = "All", sortBy = "Last modified") => {
  return useQuery({
    queryKey: ["deals", userId, filterBy, sortBy],
    enabled: !!userId,

    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/deal/user-deals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          filterBy,
          sortBy
        })
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`API Error: ${err}`);
      }

      return res.json();
    }
  });
}


export const useGetDealById = (dealId) => {
  return useQuery({
    queryKey: ["deal", dealId],
    enabled: !!dealId, // Nur ausführen, wenn projectId existiert

    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/deal/${dealId}`);

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`API Error: ${err}`);
      }

      return res.json(); // erwartet ein Projekt-Objekt
    }
  });
};


export const useGetUserById = (userId) => {
  return useQuery({
    queryKey: ["user", userId],
    enabled: !!userId, // Verhindert Query, wenn userId noch undefined ist

    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/user/${userId}`);

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`API Error: ${err}`);
      }

      return res.json(); // erwartet ein User-Objekt
    }
  });
};

// EINZELNER Report
export const useGetReportById = (reportId) => {
  return useQuery({
    queryKey: ["report", reportId],
    enabled: !!reportId,
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/report/${reportId}`);
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    }
  });
};

// ALLE Reports zu einem Projekt
export const useGetReportsByDealId = (dealId) => {
  return useQuery({
    queryKey: ["reports", dealId],
    enabled: !!dealId,
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/report/deal/${dealId}`);
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    }
  });
};


export const useUpdateReport = () => {
  return useMutation({
    mutationFn: async ({ reportId, updatedFields }) => {
      const res = await fetch(`${API_BASE_URL}/report/update/${reportId}`, {
        method: "PATCH", // alternativ "PUT", wenn du alles ersetzt
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`API Error: ${err}`);
      }

      return res.json(); // gibt den aktualisierten Report zurück
    },

    onSuccess: (data) => {
      console.log("✅ Report erfolgreich aktualisiert:", data);
    },

    onError: (error) => {
      console.error("❌ Fehler beim Aktualisieren des Reports:", error.message);
    },
  });
};

export const useGenerateText = () => {
  const mutation = useMutation({
    mutationFn: async (input) => {
      const response = await fetch(`${API_BASE_URL}/llm/generate-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ input }), // oder direkt input, je nach Backend-Expectations
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(`Textgenerierung fehlgeschlagen: ${text}`);
      }

      try {
        return JSON.parse(text); // falls dein Backend JSON zurückgibt
      } catch (e) {
        return { content: text }; // falls plain text zurückkommt
      }
    },

    onSuccess: (data) => {
      if (!data) {
        throw new Error("Keine gültige Antwort vom Textgenerator erhalten.");
      }
    },

    onError: (error) => {
      console.error("❌ Fehler bei der Textgenerierung:", error.message);
    }
  });

  return mutation;
};


export const useCreateSource = () => {
  return useMutation({
    mutationFn: async ({ dealId, source, title, snippet, url }) => {
      const res = await fetch(`${API_BASE_URL}/source/create-source`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ dealId, source, title, snippet, url })
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`API Error: ${err}`);
      }

      return res.json(); // erwartet Bestätigung oder gespeichertes Objekt
    },

    onSuccess: (data) => {
      console.log("✅ Quelle erfolgreich erstellt:", data);
    },

    onError: (error) => {
      console.error("❌ Fehler beim Erstellen der Quelle:", error.message);
    }
  });
};

export const useGetNewsOfReport = () => {
  const mutation = useMutation({
    mutationFn: async ({ messages }) => {
      const response = await fetch(`${API_BASE_URL}/llm/get-news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(messages)
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(`Fehler beim Abrufen der News: ${text}`);
      }

      try {
        return JSON.parse(text); // erwartet: Array von News-Objekten
      } catch {
        return []; // im Fehlerfall leeres Array zurückgeben
      }
    },

    onSuccess: (data) => {
      // optional: Logging oder Side Effects
    },

    onError: (error) => {
      console.error("❌ Fehler beim Abrufen der News:", error.message);
    }
  });

  return mutation;
};

// ALLE Reports zu einem Projekt
export const useGetSourcesByDealId = (dealId) => {
  return useQuery({
    queryKey: ["sources", dealId],
    enabled: !!dealId,
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/source/deal/${dealId}`);
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    }
  });
};


export const useGetDealMembers = ({ userId, dealId }) => {
  return useQuery({
    queryKey: ["deal-members", userId, dealId],
    enabled: !!userId && !!dealId,
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/deal/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, dealId })
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`API Error: ${err}`);
      }

      return res.json(); // erwartet: Array von Mitgliedern
    }
  });
};

export const useAddDealMember = () => {
  return useMutation({
    mutationFn: async ({ userId, dealId, email }) => {
      const res = await fetch(`${API_BASE_URL}/deal/add-member`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, dealId, email })
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`API Error: ${err}`);
      }

      return res.json(); // z. B. updated project oder confirmation
    },

    onSuccess: (data) => {
      console.log("✅ Mitglied hinzugefügt:", data);
    },

    onError: (error) => {
      console.error("❌ Fehler beim Hinzufügen des Mitglieds:", error.message);
    }
  });
};


export const useRemoveDealMember = () => {
  return useMutation({
    mutationFn: async ({ dealId, userId, memberId }) => {
      const res = await fetch(`${API_BASE_URL}/deal/remove-member`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ dealId, userId, memberId })
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Fehler beim Entfernen des Mitglieds: ${err}`);
      }

      return res.json(); // z.B. updatedes Members-Array
    },

    onSuccess: (data) => {
      console.log("✅ Mitglied entfernt:", data);
    },

    onError: (error) => {
      console.error("❌ Fehler beim Entfernen des Mitglieds:", error.message);
    }
  });
};

export const useGetPortfolioOfUser = (userId) => {
  return useQuery({
    queryKey: ["portfolio", userId],
    enabled: !!userId,

    queryFn: async () => {
      const url = `${API_BASE_URL}/user/${userId}/portfolio`;
      console.log("Calling:", url);

      const res = await fetch(url);

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`API Error: ${err}`);
      }

      return res.json();
    },

    onError: (error) => {
      console.error("❌ Fehler beim Laden des Portfolios:", error.message);
    }
  });
};

export const useAddInvestmentToPortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, investment }) => {
      const res = await fetch(`${API_BASE_URL}/user/${userId}/portfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(investment), // z. B. { company, capital, stake }
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`API Error: ${err}`);
      }

      return res.json(); // erwartet: aktualisiertes Portfolio oder OK-Response
    },

    onSuccess: () => {
      console.log('✅ Investment erfolgreich hinzugefügt');
      queryClient.invalidateQueries({ queryKey: ['portfolio'] }); // aktualisiert das Portfolio automatisch
    },

    onError: (error) => {
      console.error('❌ Fehler beim Hinzufügen des Investments:', error.message);
    },
  });
};

export const useDeleteInvestmentFromPortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, investmentIndex }) => {
      const res = await fetch(`${API_BASE_URL}/user/${userId}/portfolio/${investmentIndex}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`API Error: ${err}`);
      }

      return res.json(); // optional: aktualisiertes Portfolio
    },

    onSuccess: () => {
      console.log('✅ Investment erfolgreich gelöscht');
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },

    onError: (error) => {
      console.error('❌ Fehler beim Löschen des Investments:', error.message);
    },
  });
};